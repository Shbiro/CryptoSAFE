import time
import requests
from binance.client import Client
from airtable import Airtable
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Binance API credentials
API_KEY = os.getenv('BINANCE_API_KEY')
API_SECRET = os.getenv('BINANCE_API_SECRET')

# Airtable credentials
AIRTABLE_API_KEY = os.getenv('AIRTABLE_API_KEY')
AIRTABLE_BASE_ID = os.getenv('AIRTABLE_BASE_ID')
AIRTABLE_TABLE_NAME = os.getenv('AIRTABLE_TABLE_NAME')

# Initialize Binance client
client = Client(API_KEY, API_SECRET)

# Initialize Airtable table
airtable = Airtable(AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, api_key=AIRTABLE_API_KEY)

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

def fetch_crypto_prices():
    """
    Fetch crypto prices from Binance API with error handling.
    """
    prices = {}
    for field, symbol in crypto_symbols.items():
        try:
            ticker = client.get_symbol_ticker(symbol=symbol)  # ✅ תוקן - שימוש נכון בפונקציה
            prices[field] = str(float(ticker['price']))
        except requests.exceptions.RequestException as e:
            print(f"⚠️ Network error fetching {symbol}: {e}")
            prices[field] = "N/A"
        except Exception as e:
            print(f"⚠️ Error fetching {symbol}: {e}")
            prices[field] = "N/A"

    return prices

def update_airtable(prices):
    """
    Update the first row in Airtable with new prices.
    """
    try:
        records = airtable.get_all()
        if not records:
            print("❌ No records found in Airtable.")
            return False

        first_record_id = records[0]['id']
        
        # ✅ ביצוע Retry עד 3 פעמים במקרה של כשל
        for attempt in range(3):
            try:
                airtable.update(first_record_id, prices)
                print("✅ Successfully updated Airtable!")
                return True
            except requests.exceptions.RequestException as e:
                print(f"⚠️ Error updating Airtable (attempt {attempt+1}/3): {e}")
                time.sleep(2)  # ✅ חכה 2 שניות לפני ניסיון נוסף
        
        print("❌ Failed to update Airtable after 3 attempts.")
        return False
    except Exception as e:
        print(f"🚨 Unexpected error updating Airtable: {e}")
        return False

def update_crypto_prices():
    """
    Fetch crypto prices and update Airtable continuously.
    """
    while True:
        try:
            prices = fetch_crypto_prices()
            update_airtable(prices)
            time.sleep(5)  # ✅ שינוי מ-1 שנייה ל-5 שניות כדי להפחית עומס על השרתים
        except KeyboardInterrupt:
            print("\n🛑 Stopping the script...")
            break
        except Exception as e:
            print(f"🚨 Unexpected error in main loop: {e}")
            time.sleep(5)  # ✅ חכה 5 שניות לפני ניסיון נוסף

if __name__ == "__main__":
    update_crypto_prices()
