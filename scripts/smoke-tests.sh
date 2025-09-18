#!/bin/bash

# Smoke tests for LexAtlas
# Usage: BASE_URL=https://lex-atlas.com bash scripts/smoke-tests.sh
# Example: BASE_URL=https://lex-atlas.com bash scripts/smoke-tests.sh

set -e

# Configuration
BASE_URL="${BASE_URL:-https://lex-atlas.com}"
TIMEOUT=30
MAX_RETRIES=3

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Test function with retries
test_url() {
    local url="$1"
    local description="$2"
    local retries=0
    
    while [ $retries -lt $MAX_RETRIES ]; do
        if curl -s -f -L --max-time $TIMEOUT "$url" > /dev/null 2>&1; then
            log_success "$description: $url"
            return 0
        else
            retries=$((retries + 1))
            if [ $retries -lt $MAX_RETRIES ]; then
                log_warning "$description failed (attempt $retries/$MAX_RETRIES), retrying..."
                sleep 2
            fi
        fi
    done
    
    log_error "$description: $url (failed after $MAX_RETRIES attempts)"
    return 1
}

# Test function for JSON-LD presence and content
test_json_ld() {
    local url="$1"
    local description="$2"
    
    local response=$(curl -s -L --max-time $TIMEOUT "$url" 2>/dev/null)
    if echo "$response" | grep -q '<script type="application/ld\+json">'; then
        # Check for Product JSON-LD
        if echo "$response" | grep -q '"@type":"Product"'; then
            log_success "$description: Product JSON-LD found"
            # Check for price
            if echo "$response" | grep -q '"price":"29.00"'; then
                log_success "$description: Price found in JSON-LD"
                return 0
            else
                log_error "$description: Price not found in JSON-LD"
                return 1
            fi
        else
            log_error "$description: Product JSON-LD not found"
            return 1
        fi
    else
        log_error "$description: JSON-LD not found"
        return 1
    fi
}

# Test function for title presence and content
test_title() {
    local url="$1"
    local description="$2"
    local expected_keyword="$3"
    
    local response=$(curl -s -L --max-time $TIMEOUT "$url" 2>/dev/null)
    if echo "$response" | grep -q "<title>.*$expected_keyword.*</title>"; then
        log_success "$description: Title contains '$expected_keyword'"
        return 0
    else
        log_error "$description: Title missing or doesn't contain '$expected_keyword'"
        return 1
    fi
}

# Test function for canonical URL
test_canonical() {
    local url="$1"
    local description="$2"
    
    local response=$(curl -s -L --max-time $TIMEOUT "$url" 2>/dev/null)
    if echo "$response" | grep -q "<link rel=\"canonical\" href=\"$url\""; then
        log_success "$description: Canonical URL correct"
        return 0
    else
        log_error "$description: Canonical URL incorrect or missing"
        return 1
    fi
}

# Test function for meta description
test_meta_description() {
    local url="$1"
    local description="$2"
    
    local response=$(curl -s -L --max-time $TIMEOUT "$url" 2>/dev/null)
    if echo "$response" | grep -q '<meta name="description"'; then
        log_success "$description: Meta description found"
        return 0
    else
        log_error "$description: Meta description missing"
        return 1
    fi
}

# Test function for Open Graph tags
test_og_tags() {
    local url="$1"
    local description="$2"
    
    local response=$(curl -s -L --max-time $TIMEOUT "$url" 2>/dev/null)
    local og_tags=("og:title" "og:description" "og:url" "og:type")
    local missing_tags=()
    
    for tag in "${og_tags[@]}"; do
        if ! echo "$response" | grep -q "<meta property=\"$tag\""; then
            missing_tags+=("$tag")
        fi
    done
    
    if [ ${#missing_tags[@]} -eq 0 ]; then
        log_success "$description: All Open Graph tags present"
        return 0
    else
        log_error "$description: Missing Open Graph tags: ${missing_tags[*]}"
        return 1
    fi
}

# Main execution
main() {
    log_info "Starting smoke tests for $BASE_URL"
    log_info "Timestamp: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
    
    local failed_tests=0
    local total_tests=0
    
    # Test 1: Homepage
    log_info "Testing homepage..."
    test_url "$BASE_URL" "Homepage" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_title "$BASE_URL" "Homepage title" "LexAtlas" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_canonical "$BASE_URL" "Homepage canonical" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_meta_description "$BASE_URL" "Homepage meta description" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_og_tags "$BASE_URL" "Homepage Open Graph" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 2: Kits page
    log_info "Testing kits page..."
    test_url "$BASE_URL/kits" "Kits page" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_title "$BASE_URL/kits" "Kits page title" "Kits" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_canonical "$BASE_URL/kits" "Kits page canonical" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 3: Pricing page
    log_info "Testing pricing page..."
    test_url "$BASE_URL/pricing" "Pricing page" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_title "$BASE_URL/pricing" "Pricing page title" "Pricing" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    test_canonical "$BASE_URL/pricing" "Pricing page canonical" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 4: Kit pages (all 10 kits)
    log_info "Testing kit pages..."
    local kit_slugs=(
        "fra-usa"
        "fra-gbr"
        "fra-can"
        "fra-mar"
        "fra-deu"
        "fra-che"
        "fra-bel"
        "fra-esp"
        "fra-ita"
        "fra-prt"
    )
    
    for slug in "${kit_slugs[@]}"; do
        local kit_url="$BASE_URL/kits/$slug"
        log_info "Testing kit: $slug"
        
        # Basic connectivity
        test_url "$kit_url" "Kit: $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # Title test
        test_title "$kit_url" "Title for $slug" "Marriage Guide" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # Canonical URL test
        test_canonical "$kit_url" "Canonical for $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # Meta description test
        test_meta_description "$kit_url" "Meta description for $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # Open Graph tags test
        test_og_tags "$kit_url" "Open Graph for $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # JSON-LD test
        test_json_ld "$kit_url" "JSON-LD for $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
    done
    
    # Test 5: API endpoints
    log_info "Testing API endpoints..."
    test_url "$BASE_URL/api/vitals" "Vitals API" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 6: Sitemap
    log_info "Testing sitemap..."
    test_url "$BASE_URL/sitemap.xml" "Sitemap" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 7: Robots.txt
    log_info "Testing robots.txt..."
    test_url "$BASE_URL/robots.txt" "Robots.txt" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Summary
    log_info "=========================================="
    log_info "Smoke tests complete"
    log_info "Total tests: $total_tests"
    log_info "Failed tests: $failed_tests"
    log_info "Success rate: $(( (total_tests - failed_tests) * 100 / total_tests ))%"
    
    if [ $failed_tests -eq 0 ]; then
        log_success "All smoke tests passed! 🎉"
        exit 0
    else
        log_error "$failed_tests smoke tests failed. Please check the logs above."
        exit 1
    fi
}

# Run main function
main "$@"