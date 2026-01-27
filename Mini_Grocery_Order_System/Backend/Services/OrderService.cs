using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class OrderService
    {
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;

        public OrderService(
            IProductRepository productRepository,
            IOrderRepository orderRepository)
        {
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        public async Task<(bool Success, string Message)> PlaceOrderAsync(int productId, int quantity)
        {
            using var transaction = await _orderRepository.BeginTransactionAsync();

            try
            {
                // 1. Check product exists
                var product = await _productRepository.GetByIdAsync(productId);
                if (product == null)
                {
                    return (false, "Product not found");
                }

                // 2. Check stock
                if (product.Stock < quantity)
                {
                    return (false, "Insufficient stock");
                }

                // 3. Reduce stock
                product.Stock -= quantity;
                await _productRepository.UpdateAsync(product);

                // 4. Create order
                var order = new Order
                {
                    ProductId = product.Id,
                    Quantity = quantity,
                    TotalPrice = product.Price * quantity
                };

                await _orderRepository.AddAsync(order);

                // 5. Commit transaction
                await transaction.CommitAsync();

                return (true, "Order placed successfully");
            }
            catch
            {
                await transaction.RollbackAsync();
                return (false, "Order failed");
            }
        }
    }
}
