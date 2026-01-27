using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("orders")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }

        public class CreateOrderRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }

        // POST /orders
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                // Capture success/failure and message from service
                var (success, message) = await _orderService.PlaceOrderAsync(request.ProductId, request.Quantity);

                if (!success)
                {
                    // Return 400 if order fails
                    return BadRequest(new { message });
                }

                // Return 200 if order succeeds
                return Ok(new { message });
            }
            catch (Exception ex)
            {
                // Catch any unexpected error
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
