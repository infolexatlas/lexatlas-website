# Marriage Kit PDFs

This directory contains the downloadable PDF files for each country's Marriage Kit.

## File Structure

Each PDF should be named using the country's ISO 2-letter code:

```
public/downloads/marriage/
├── US.pdf    # United States Marriage Kit
├── FR.pdf    # France Marriage Kit
├── DE.pdf    # Germany Marriage Kit
├── GB.pdf    # United Kingdom Marriage Kit
├── CA.pdf    # Canada Marriage Kit
└── ...       # etc. for all 30 countries
```

## Supported Countries

The following 30 countries are supported:

- US - United States
- CA - Canada
- GB - United Kingdom
- IE - Ireland
- FR - France
- DE - Germany
- IT - Italy
- ES - Spain
- PT - Portugal
- NL - Netherlands
- BE - Belgium
- LU - Luxembourg
- CH - Switzerland
- AT - Austria
- SE - Sweden
- NO - Norway
- DK - Denmark
- FI - Finland
- IS - Iceland
- GR - Greece
- CY - Cyprus
- MT - Malta
- PL - Poland
- CZ - Czech Republic
- SK - Slovakia
- HU - Hungary
- RO - Romania
- BG - Bulgaria
- HR - Croatia
- SI - Slovenia

## PDF Requirements

Each PDF should contain:

1. **Country-specific marriage procedures**
2. **Required documents checklist**
3. **Step-by-step instructions**
4. **Document templates**
5. **Processing timelines**
6. **Fee breakdowns**
7. **Contact information for authorities**

## Fallback System

If a PDF file is not found for a specific country, the system will:

1. Generate a placeholder PDF with basic content
2. Log the missing file for tracking
3. Serve the placeholder to maintain user experience

## Security

- PDFs are only accessible after successful payment verification
- Anti-hotlink protection is in place
- Downloads are tracked for analytics

## Adding New PDFs

1. Create the PDF file with the correct country code
2. Place it in this directory
3. Ensure the file is properly formatted and complete
4. Test the download functionality

## Testing

To test PDF downloads:

1. Complete a test purchase for any country
2. Navigate to the success page
3. Click the download button
4. Verify the correct PDF is downloaded

## Notes

- PDFs should be optimized for file size (target: <5MB)
- Use consistent formatting across all country PDFs
- Include version information in each PDF
- Regular updates may be required as procedures change
