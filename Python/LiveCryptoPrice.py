import time
import requests
import csv
import os
from binance.client import Client
from dotenv import load_dotenv

# Load environment variables from 2.env file
load_dotenv("2.env")

# Binance API credentials
API_KEY = os.getenv('BINANCE_API_KEY')
API_SECRET = os.getenv('BINANCE_API_SECRET')

# Initialize Binance client
client = Client(API_KEY, API_SECRET)

# Cryptocurrency symbols
crypto_symbols = {
    "BitcoinPrice": "BTCUSDT",
    "XrpPrice": "XRPUSDT",
    "EthPrice": "ETHUSDT",
    "DogePrice": "DOGEUSDT",
    "CardanoPrice": "ADAUSDT",
    "LitecoinPrice": "LTCUSDT",
    "BnbPrice": "BNBUSDT",
    "PolkadotPrice": "DOTUSDT"
}

# CSV File Path
CSV_FILE = "LivePrice.csv"

def write_csv_header():
    """Creates or overwrites the CSV file with headers only (without timestamp)."""
    with open(CSV_FILE, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        headers = list(crypto_symbols.keys())  # 🔹 הסר את ה-Timestamp
        writer.writerow(headers)
    print(f"✅ CSV file initialized: {CSV_FILE}")

def fetch_crypto_prices():
    """Fetch crypto prices from Binance API with error handling."""
    prices = {}
    for field, symbol in crypto_symbols.items():
        try:
            ticker = client.get_symbol_ticker(symbol=symbol)
            prices[field] = str(float(ticker['price']))
        except requests.exceptions.RequestException as e:
            print(f"⚠️ Network error fetching {symbol}: {e}")
            prices[field] = "N/A"
        except Exception as e:
            print(f"⚠️ Error fetching {symbol}: {e}")
            prices[field] = "N/A"
    return prices

def update_csv(prices):
    """Updates the first row of the CSV file with the latest prices (without timestamp)."""
    try:
        row = [prices[symbol] for symbol in crypto_symbols.keys()]  # 🔹 הסר את ה-Timestamp

        # Overwrite CSV with new data
        with open(CSV_FILE, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            headers = list(crypto_symbols.keys())  # 🔹 הסר את ה-Timestamp
            writer.writerow(headers)  # Write headers again
            writer.writerow(row)  # Write new data

        print(f"✅ CSV updated with latest prices")
    except Exception as e:
        print(f"❌ Error updating CSV: {e}")

def update_crypto_prices():
    """Fetch crypto prices and update CSV continuously."""
    write_csv_header()  # Initialize CSV with headers

    while True:
        try:
            prices = fetch_crypto_prices()
            update_csv(prices)
            time.sleep(2)  # ✅ Update every 2 seconds
        except KeyboardInterrupt:
            print("\n🛑 Stopping the script...")
            break
        except Exception as e:
            print(f"🚨 Unexpected error in main loop: {e}")
            time.sleep(2)

if __name__ == "__main__":
    update_crypto_prices()
