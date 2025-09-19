#!/bin/bash

# Test script for favicon and logo accessibility
# This script checks that all favicon and logo files are accessible

BASE_URL="http://localhost:3000"
echo "🔍 Testing favicon and logo accessibility for Google Search..."
echo ""

# Test favicon files
echo "📁 Testing favicon files:"
favicon_files=(
    "/favicon.ico"
    "/favicon-16x16.png"
    "/favicon-32x32.png"
    "/apple-touch-icon.png"
)

for file in "${favicon_files[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$file")
    if [ "$status" = "200" ]; then
        echo "✅ $file - OK ($status)"
    else
        echo "❌ $file - FAILED ($status)"
    fi
done

echo ""

# Test logo files
echo "🎨 Testing logo files:"
logo_files=(
    "/logo-180x180.png"
    "/logo-512x512.png"
)

for file in "${logo_files[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$file")
    if [ "$status" = "200" ]; then
        echo "✅ $file - OK ($status)"
    else
        echo "❌ $file - FAILED ($status)"
    fi
done

echo ""

# Test manifest and config files
echo "📋 Testing manifest and config files:"
config_files=(
    "/manifest.webmanifest"
    "/browserconfig.xml"
    "/robots.txt"
)

for file in "${config_files[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$file")
    if [ "$status" = "200" ]; then
        echo "✅ $file - OK ($status)"
    else
        echo "❌ $file - FAILED ($status)"
    fi
done

echo ""

# Test HTML meta tags
echo "🏷️  Testing HTML meta tags:"
html_response=$(curl -s "$BASE_URL/")
if echo "$html_response" | grep -q 'rel="icon"'; then
    echo "✅ Icon meta tags found"
else
    echo "❌ Icon meta tags missing"
fi

if echo "$html_response" | grep -q 'property="og:logo"'; then
    echo "✅ Open Graph logo meta tag found"
else
    echo "❌ Open Graph logo meta tag missing"
fi

if echo "$html_response" | grep -q 'rel="manifest"'; then
    echo "✅ Web manifest link found"
else
    echo "❌ Web manifest link missing"
fi

echo ""
echo "🎯 Favicon and logo test completed!"
echo "💡 For Google Search visibility, ensure:"
echo "   - All files return HTTP 200"
echo "   - Meta tags are present in HTML"
echo "   - JSON-LD structured data includes logo"
echo "   - robots.txt allows favicon crawling"
