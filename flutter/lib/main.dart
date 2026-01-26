import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

void main() => runApp(OrderApp());

// ---------------- DEMO DATA ----------------
final List<Map<String, dynamic>> demoProducts = [
  {"id": 1, "name": "Product A", "stock": 5},
  {"id": 2, "name": "Product B", "stock": 10},
  {"id": 3, "name": "Product C", "stock": 7},
];

// ---------------- APP ----------------
class OrderApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Inventory Order',
      home: OrderScreen(),
    );
  }
}

class OrderScreen extends StatefulWidget {
  @override
  _OrderScreenState createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen> {
  final _productController = TextEditingController();
  final _quantityController = TextEditingController();
  String message = '';

  // ---------------- ORDER API ----------------
  Future<void> placeOrder() async {
    final productId = int.tryParse(_productController.text);
    final quantity = int.tryParse(_quantityController.text);

    if (productId == null || quantity == null) {
      setState(() => message = '❌ Invalid input');
      return;
    }

    try {
      final response = await http.post(
        Uri.parse('http://localhost:3000/order'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'productId': productId, 'quantity': quantity}),
      );

      final data = jsonDecode(response.body);
      setState(() {
        if (data['error'] != null) {
          message = '❌ ${data['error']}';
        } else {
          message = '✅ Order ${data['orderId']} created, status: ${data['status']}';
        }
      });
    } catch (e) {
      setState(() => message = '❌ Error: $e');
    }
  }

  // ---------------- DEMO BOX UI ----------------
  Widget buildDemoBox() {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFFEAF3FF),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFBBD6FF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            "Sample Products (Demo Only)",
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 6),
          const Text(
            "This list is static and for reference only. Live stock validation happens in the backend.",
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: Colors.black54),
          ),
          const SizedBox(height: 10),

          // Header
          Row(
            children: const [
              Expanded(
                  child: Text("ID",
                      textAlign: TextAlign.center,
                      style: TextStyle(fontWeight: FontWeight.bold))),
              Expanded(
                  child: Text("Name",
                      textAlign: TextAlign.center,
                      style: TextStyle(fontWeight: FontWeight.bold))),
              Expanded(
                  child: Text("Stock",
                      textAlign: TextAlign.center,
                      style: TextStyle(fontWeight: FontWeight.bold))),
            ],
          ),
          const Divider(),

          // Rows
          ...demoProducts.map((p) {
            return Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                children: [
                  Expanded(
                      child: Text(p["id"].toString(),
                          textAlign: TextAlign.center)),
                  Expanded(
                      child:
                          Text(p["name"], textAlign: TextAlign.center)),
                  Expanded(
                      child: Text(p["stock"].toString(),
                          textAlign: TextAlign.center)),
                ],
              ),
            );
          }).toList(),
        ],
      ),
    );
  }

  // ---------------- UI ----------------
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Place Order')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // 👇 Demo Panel
            buildDemoBox(),

            // 👇 Order Form
            TextField(
              controller: _productController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Product ID'),
            ),
            TextField(
              controller: _quantityController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Quantity'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: placeOrder,
              child: const Text('Place Order'),
            ),
            const SizedBox(height: 20),
            Text(message),
          ],
        ),
      ),
    );
  }
}
