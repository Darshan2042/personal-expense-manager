#!/bin/bash

echo "🚀 Starting Deployment Preparation..."
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
echo "Installing client dependencies..."
cd client
npm install
echo "✅ Client dependencies installed"

cd ..
echo "Installing server dependencies..."
cd server
npm install
echo "✅ Server dependencies installed"

cd ..
echo ""
echo "🏗️  Step 2: Building frontend..."
cd client
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

cd ..
echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Create MongoDB Atlas database (if not done)"
echo "2. Update environment variables in deployment platforms"
echo "3. Deploy backend to Render/Railway"
echo "4. Deploy frontend to Netlify/Vercel"
echo ""
echo "📄 See DEPLOYMENT.md for detailed instructions"
