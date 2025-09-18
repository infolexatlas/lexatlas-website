#!/bin/bash

# Post-deployment verification script for LexAtlas
# Usage: bash scripts/post-deploy.sh [BASE_URL]
# Example: bash scripts/post-deploy.sh https://lex-atlas.com

set -e

# Configuration
BASE_URL="${1:-https://lex-atlas.com}"
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

# Test function for JSON-LD presence
test_json_ld() {
    local url="$1"
    local description="$2"
    
    local response=$(curl -s -L --max-time $TIMEOUT "$url" 2>/dev/null)
    if echo "$response" | grep -q '<script type="application/ld\+json">'; then
        log_success "$description: JSON-LD found"
        return 0
    else
        log_error "$description: JSON-LD not found"
        return 1
    fi
}

# Test function for title presence
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

# Main execution
main() {
    log_info "Starting post-deployment verification for $BASE_URL"
    log_info "Timestamp: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
    
    local failed_tests=0
    local total_tests=0
    
    # Test 1: Basic connectivity
    log_info "Testing basic connectivity..."
    test_url "$BASE_URL" "Homepage" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 2: API endpoints
    log_info "Testing API endpoints..."
    test_url "$BASE_URL/api/vitals" "Vitals API" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 3: Sitemap
    log_info "Testing sitemap..."
    test_url "$BASE_URL/sitemap.xml" "Sitemap" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 4: Robots.txt
    log_info "Testing robots.txt..."
    test_url "$BASE_URL/robots.txt" "Robots.txt" || failed_tests=$((failed_tests + 1))
    total_tests=$((total_tests + 1))
    
    # Test 5: Key pages
    log_info "Testing key pages..."
    local key_pages=(
        "/kits"
        "/pricing"
        "/about"
        "/contact"
        "/faq"
    )
    
    for page in "${key_pages[@]}"; do
        test_url "$BASE_URL$page" "Page: $page" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
    done
    
    # Test 6: Kit pages (all 10 kits)
    log_info "Testing kit pages..."
    local kit_slugs=(
        "france-usa-marriage-guide"
        "france-uk-marriage-guide"
        "france-canada-marriage-guide"
        "france-morocco-marriage-guide"
        "france-germany-marriage-guide"
        "france-switzerland-marriage-guide"
        "france-belgium-marriage-guide"
        "france-spain-marriage-guide"
        "france-italy-marriage-guide"
        "france-portugal-marriage-guide"
    )
    
    for slug in "${kit_slugs[@]}"; do
        local kit_url="$BASE_URL/kits/$slug"
        test_url "$kit_url" "Kit: $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # Test JSON-LD for kit pages
        test_json_ld "$kit_url" "JSON-LD for $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # Test title for kit pages
        test_title "$kit_url" "Title for $slug" "Marriage Guide" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
        
        # Test canonical URL for kit pages
        test_canonical "$kit_url" "Canonical for $slug" || failed_tests=$((failed_tests + 1))
        total_tests=$((total_tests + 1))
    done
    
    # Test 7: Ping search engines (optional)
    log_info "Pinging search engines..."
    if command -v curl >/dev/null 2>&1; then
        # Ping Google
        curl -s "https://www.google.com/ping?sitemap=$BASE_URL/sitemap.xml" > /dev/null 2>&1 && \
            log_success "Google sitemap pinged" || log_warning "Google sitemap ping failed"
        
        # Ping Bing
        curl -s "https://www.bing.com/ping?sitemap=$BASE_URL/sitemap.xml" > /dev/null 2>&1 && \
            log_success "Bing sitemap pinged" || log_warning "Bing sitemap ping failed"
    else
        log_warning "curl not available for search engine pinging"
    fi
    
    # Test 8: Security headers
    log_info "Testing security headers..."
    local headers_response=$(curl -s -I --max-time $TIMEOUT "$BASE_URL" 2>/dev/null)
    local security_headers=(
        "Strict-Transport-Security"
        "X-Content-Type-Options"
        "X-Frame-Options"
        "Referrer-Policy"
        "Permissions-Policy"
    )
    
    for header in "${security_headers[@]}"; do
        if echo "$headers_response" | grep -qi "$header"; then
            log_success "Security header present: $header"
        else
            log_error "Security header missing: $header"
            failed_tests=$((failed_tests + 1))
        fi
        total_tests=$((total_tests + 1))
    done
    
    # Summary
    log_info "=========================================="
    log_info "Post-deployment verification complete"
    log_info "Total tests: $total_tests"
    log_info "Failed tests: $failed_tests"
    log_info "Success rate: $(( (total_tests - failed_tests) * 100 / total_tests ))%"
    
    if [ $failed_tests -eq 0 ]; then
        log_success "All tests passed! 🎉"
        exit 0
    else
        log_error "$failed_tests tests failed. Please check the logs above."
        exit 1
    fi
}

# Run main function
main "$@"