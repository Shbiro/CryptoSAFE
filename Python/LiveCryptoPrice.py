import time
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

# Fetch and update prices for multiple cryptocurrencies in Airtable
def update_crypto_prices():
    try:
        while True:
            # Fetch prices for multiple cryptocurrencies
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

            prices = {}
            for field, symbol in crypto_symbols.items():
                ticker = client.get_symbol_ticker(symbol=symbol)
                prices[field] = str(float(ticker['price']))  # Convert to string

            # Get the first row's record ID
            records = airtable.get_all()
            if not records:
                print("No records found in Airtable.")
                break

            first_record_id = records[0]['id']

            # Update prices in the first row
            airtable.update(first_record_id, prices)

            # Print the updated prices
            for field, price in prices.items():
                print(f"{field} updated: ${price}")

            time.sleep(1)  # Pause for 5 seconds before fetching again
    except Exception as e:
        print(f"Error updating crypto prices: {e}")

if __name__ == "__main__":
    update_crypto_prices()
