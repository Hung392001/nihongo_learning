try:
    from PyPDF2 import PdfReader
    pdf = PdfReader('grammar.pdf')
    print(f"Total pages: {len(pdf.pages)}")
    print("\n--- First page content (first 1000 chars) ---\n")
    text = pdf.pages[0].extract_text()
    print(text[:1000] if text else "No text extracted from first page")
except ImportError as e:
    print(f"PyPDF2 import error: {e}")
except Exception as e:
    print(f"Error: {e}")
