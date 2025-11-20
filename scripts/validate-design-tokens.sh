#!/bin/bash

# Design Token Validation Script
# Checks for hardcode colors in CSS files (EXCEPT globals.css where tokens are defined)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎨 Design Token Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Checking component CSS files (excluding globals.css)..."
echo ""

FOUND_ISSUES=0

# Check for hex colors in property values (not comments)
# Exclude globals.css where tokens are defined
echo "Checking for hex colors in property values..."
HEX_RESULTS=$(grep -r "#[0-9a-fA-F]\{3,6\}" src/frontend/app src/frontend/components --include="*.module.css" -n 2>/dev/null | grep -v "globals.css" | grep -v "/\*" | grep -v "\*/" | grep ": " || true)
if [ -n "$HEX_RESULTS" ]; then
    echo "❌ Found hex colors in property values:"
    echo "$HEX_RESULTS"
    echo ""
    FOUND_ISSUES=1
else
    echo "✅ No hex colors in property values"
    echo ""
fi

# Check for rgba in property values (not in token definitions)
# Exclude globals.css where tokens are defined
echo "Checking for rgba() in property values..."
RGBA_RESULTS=$(grep -r "rgba(" src/frontend/app src/frontend/components --include="*.module.css" -n 2>/dev/null | grep -v "globals.css" | grep -v "/\*" | grep -v "\*/" | grep ": " || true)
if [ -n "$RGBA_RESULTS" ]; then
    echo "❌ Found rgba() in property values:"
    echo "$RGBA_RESULTS"
    echo ""
    FOUND_ISSUES=1
else
    echo "✅ No rgba() in property values"
    echo ""
fi

# Check for rgb (but not rgba) in property values
# Exclude globals.css where tokens are defined
echo "Checking for rgb() in property values..."
RGB_RESULTS=$(grep -r "rgb(" src/frontend/app src/frontend/components --include="*.module.css" -n 2>/dev/null | grep -v "globals.css" | grep -v "rgba(" | grep -v "/\*" | grep -v "\*/" | grep ": " || true)
if [ -n "$RGB_RESULTS" ]; then
    echo "❌ Found rgb() in property values:"
    echo "$RGB_RESULTS"
    echo ""
    FOUND_ISSUES=1
else
    echo "✅ No rgb() in property values"
    echo ""
fi

# Check for hsl/hsla in property values
# Exclude globals.css where tokens are defined
echo "Checking for hsl/hsla() in property values..."
HSL_RESULTS=$(grep -r "hsl\(a\)\?(" src/frontend/app src/frontend/components --include="*.module.css" -n 2>/dev/null | grep -v "globals.css" | grep -v "/\*" | grep -v "\*/" | grep ": " || true)
if [ -n "$HSL_RESULTS" ]; then
    echo "❌ Found hsl/hsla() in property values:"
    echo "$HSL_RESULTS"
    echo ""
    FOUND_ISSUES=1
else
    echo "✅ No hsl/hsla() in property values"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FOUND_ISSUES -eq 0 ]; then
    echo "✅ PASSED: All colors use design tokens!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 0
else
    echo "❌ FAILED: Hardcode colors found!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Fix: Replace hardcode colors with design tokens from globals.css"
    echo "Example: color: #FFFFFF → color: var(--color-text-on-dark-primary)"
    exit 1
fi
