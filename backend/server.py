from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
# Enable CORS so the React app can make requests to this server
CORS(app)

# ==========================================
# EMAIL CONFIGURATION
# ==========================================
# Replace these with your actual SMTP server details and credentials.
# For Gmail, you will need to generate an "App Password".
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = "RKMN1703@gmail.com"  # Replace with your email address
SENDER_PASSWORD = "your_app_password"  # Replace with your App Password

@app.route('/api/send-email', methods=['POST'])
def send_email():
    try:
        data = request.json
        to_email = data.get('to_email')
        to_name = data.get('to_name')
        date = data.get('date')
        time = data.get('time')
        guests = data.get('guests')
        special_requests = data.get('special_requests', 'None')

        if not all([to_email, to_name, date, time, guests]):
            return jsonify({"error": "Missing required fields"}), 400

        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = to_email
        msg['Subject'] = "Your Table Reservation at Brew & Bloom"

        body = f"""
        Hello {to_name},

        Thank you for choosing Brew & Bloom! Your table reservation has been confirmed.

        Reservation Details:
        - Date: {date}
        - Time: {time}
        - Guests: {guests}
        - Special Requests: {special_requests}

        We look forward to hosting you. Have a great day!

        Warm regards,
        The Brew & Bloom Team
        """

        msg.attach(MIMEText(body, 'plain'))

        # Connect to the SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls() # Secure the connection
            # Login only if credentials are changed from placeholders
            if SENDER_PASSWORD != "your_app_password":
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                server.send_message(msg)
                return jsonify({"message": "Email sent successfully"}), 200
            else:
                print("Email sending skipped: Please configure your App Password in backend/server.py")
                return jsonify({"message": "Simulated success (configure App Password to send real emails)"}), 200

    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Brew & Bloom Email Server on port 5000...")
    app.run(debug=True, port=5000)
