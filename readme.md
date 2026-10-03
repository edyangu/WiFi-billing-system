Adonis WiFi Billing System

Adonis WiFi is a WiFi billing platform built for Uganda. It lets anyone selling WiFi to collect payments automatically using MTN Mobile Money and Airtel Money.

What We Are Building

We are building a system where customers can buy WiFi access themselves without asking for password or paying cash by hand.

The customer connects to the WiFi, pays on their phone, and gets internet instantly. The owner sees all sales on a dashboard.

 How It Works

1. Customer connects to Adonis WiFi
2. A login page opens on their phone
3. They choose how long they want to browse - 1 hour, 5 hours or 24 hours
4. They enter their phone number and choose MTN or Airtel
5. They get a prompt on their phone to enter their MoMo PIN
6. After paying, they receive a voucher code
7. They enter the code and start browsing

What The System Does

- Collects payments automatically
- Creates voucher codes for each payment
- Checks if payment was successful
- Allows customer to access internet after payment
- Shows business owner total sales and active customers
- Saves all transactions

Why This System

In many places, WiFi owners have to stay around to collect cash and give out passwords. This system solves that. The owner can be away and customers can still buy and use WiFi. It is fast, transparent and easy to manage.

Who It Is For

- Hostels and lodges
- Shops and restaurants
- Communities sharing internet
- Small internet businesses
- Apartments and rentals

Technology Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Payments: MTN MoMo API, Airtel Money API
- Dashboard for admin

Backend API

POST /pay - Start payment for a customer
GET /check/:ref - Check if payment is complete
POST /validate - Validate voucher code
GET /admin/stats - View sales

Future Plans

- Add SMS for sending voucher codes
- Add daily and monthly reports
- Add different plans and pricing
- Add mobile app for customers and resellers
- Add auto disconnection when time ends

Author

Samuel Edyangu 
Kampala, Uganda
Contact:+256746200441.

This is an ongoing project. The goal is to make selling WiFi simple and automated for businesses.
