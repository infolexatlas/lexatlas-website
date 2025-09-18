# Google Analytics 4 Events Tracking Plan

## Event Configuration

### Core E-commerce Events

#### 1. View Content
```javascript
// Kit page view
gtag('event', 'view_item', {
  currency: 'EUR',
  value: 29.00,
  items: [{
    item_id: 'fra-usa',
    item_name: 'France → USA Marriage Kit',
    item_category: 'Marriage Kit',
    item_category2: 'France',
    item_category3: 'USA',
    price: 29.00,
    quantity: 1
  }]
});

// Homepage view
gtag('event', 'page_view', {
  page_title: 'LexAtlas - Cross-Border Marriage Kits',
  page_location: window.location.href,
  content_group1: 'Homepage'
});
```

#### 2. Add to Cart
```javascript
// Kit purchase initiation
gtag('event', 'add_to_cart', {
  currency: 'EUR',
  value: 29.00,
  items: [{
    item_id: 'fra-usa',
    item_name: 'France → USA Marriage Kit',
    item_category: 'Marriage Kit',
    price: 29.00,
    quantity: 1
  }]
});
```

#### 3. Start Checkout
```javascript
// Checkout page entry
gtag('event', 'begin_checkout', {
  currency: 'EUR',
  value: 29.00,
  items: [{
    item_id: 'fra-usa',
    item_name: 'France → USA Marriage Kit',
    item_category: 'Marriage Kit',
    price: 29.00,
    quantity: 1
  }]
});
```

#### 4. Purchase
```javascript
// Successful purchase
gtag('event', 'purchase', {
  transaction_id: 'txn_123456789',
  currency: 'EUR',
  value: 29.00,
  items: [{
    item_id: 'fra-usa',
    item_name: 'France → USA Marriage Kit',
    item_category: 'Marriage Kit',
    price: 29.00,
    quantity: 1
  }]
});
```

### Custom Events

#### 5. Sample Download
```javascript
// Lead magnet sample download
gtag('event', 'sample_download', {
  event_category: 'Lead Generation',
  event_label: 'Free Sample Kit',
  value: 0
});
```

#### 6. Email Submit
```javascript
// Lead magnet email submission
gtag('event', 'email_submit', {
  event_category: 'Lead Generation',
  event_label: 'Lead Magnet Form',
  custom_parameter_1: 'homepage_banner'
});
```

#### 7. FAQ Interaction
```javascript
// FAQ accordion open
gtag('event', 'faq_interaction', {
  event_category: 'Engagement',
  event_label: 'FAQ Opened',
  custom_parameter_1: 'marriage_documents'
});
```

#### 8. Kit Comparison
```javascript
// Kit comparison view
gtag('event', 'kit_comparison', {
  event_category: 'Product Research',
  event_label: 'Multiple Kits Viewed',
  custom_parameter_1: 'fra-usa,fra-gbr,fra-can'
});
```

## Enhanced Measurement Events

### Automatic Events (Already Tracked)
- **page_view**: Automatic on page load
- **scroll**: Automatic at 25%, 50%, 75%, 90%
- **click**: Automatic on outbound links
- **file_download**: Automatic on PDF downloads
- **video_start**: Automatic on video play
- **video_progress**: Automatic at 25%, 50%, 75%
- **video_complete**: Automatic on video end

### Custom Parameters

#### User Properties
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'user_country',
    'custom_parameter_2': 'user_language',
    'custom_parameter_3': 'traffic_source'
  }
});
```

#### Event Parameters
```javascript
// Kit page with enhanced parameters
gtag('event', 'view_item', {
  currency: 'EUR',
  value: 29.00,
  items: [{
    item_id: 'fra-usa',
    item_name: 'France → USA Marriage Kit',
    item_category: 'Marriage Kit',
    item_category2: 'France',
    item_category3: 'USA',
    item_category4: 'International',
    price: 29.00,
    quantity: 1,
    brand: 'LexAtlas'
  }],
  // Custom parameters
  country_pair: 'fra-usa',
  kit_type: 'individual',
  page_section: 'product_detail'
});
```

## Conversion Tracking

### Primary Conversions
1. **Kit Purchase** (Value: €29)
2. **Bundle Purchase** (Value: €79)
3. **Sample Download** (Value: €0 - Lead)

### Secondary Conversions
1. **Email Signup** (Lead magnet)
2. **Contact Form Submission**
3. **FAQ Engagement** (High intent)
4. **Kit Comparison** (High intent)

## DataLayer Implementation

### Homepage DataLayer
```javascript
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'event': 'page_view',
  'page_title': 'LexAtlas - Cross-Border Marriage Kits',
  'page_location': window.location.href,
  'content_group1': 'Homepage',
  'user_country': 'FR',
  'user_language': 'en'
});
```

### Kit Page DataLayer
```javascript
dataLayer.push({
  'event': 'view_item',
  'ecommerce': {
    'currency': 'EUR',
    'value': 29.00,
    'items': [{
      'item_id': 'fra-usa',
      'item_name': 'France → USA Marriage Kit',
      'item_category': 'Marriage Kit',
      'item_category2': 'France',
      'item_category3': 'USA',
      'price': 29.00,
      'quantity': 1
    }]
  }
});
```

## Plausible Analytics Events

### Custom Events for Plausible
```javascript
// Kit page view
plausible('Kit View', {
  props: {
    kit_id: 'fra-usa',
    country_pair: 'France-USA',
    kit_type: 'individual'
  }
});

// Purchase
plausible('Purchase', {
  props: {
    kit_id: 'fra-usa',
    revenue: 29,
    currency: 'EUR'
  }
});

// Sample download
plausible('Sample Download', {
  props: {
    source: 'homepage_banner',
    kit_type: 'free_sample'
  }
});
```

## Reporting & KPIs

### Key Metrics to Track
1. **Conversion Rate**: Purchase events / Page views
2. **Average Order Value**: Total revenue / Purchase events
3. **Customer Acquisition Cost**: Ad spend / New customers
4. **Lifetime Value**: Average revenue per customer
5. **Lead Conversion Rate**: Sample downloads / Page views

### Custom Reports
1. **Kit Performance Report**
   - Views, purchases, revenue by kit
   - Conversion rate by country pair
   - Geographic performance

2. **Customer Journey Report**
   - Touchpoint analysis
   - Time to conversion
   - Drop-off points

3. **Content Performance Report**
   - Blog post engagement
   - FAQ interaction rates
   - Content to conversion paths

## Implementation Checklist

### Phase 1: Basic E-commerce (Week 1)
- [ ] Implement view_item events
- [ ] Implement add_to_cart events
- [ ] Implement begin_checkout events
- [ ] Implement purchase events
- [ ] Test all events in GA4

### Phase 2: Enhanced Tracking (Week 2)
- [ ] Add custom parameters
- [ ] Implement lead generation events
- [ ] Add engagement tracking
- [ ] Set up conversion goals

### Phase 3: Advanced Analytics (Week 3)
- [ ] Implement enhanced measurement
- [ ] Add user properties
- [ ] Set up custom reports
- [ ] Configure alerts

### Phase 4: Optimization (Week 4)
- [ ] Analyze initial data
- [ ] Optimize underperforming events
- [ ] Set up automated reports
- [ ] Document tracking implementation
