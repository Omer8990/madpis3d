import React, { useState } from 'react';
import { ShoppingCart, Menu, X, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

const products = [
  {
    id: 1,
    name: 'אגרטל גדול',
    nameEn: 'Large Vase',
    price: 149,
    description: 'אגרטל מודפס תלת מימד באיכות גבוהה, מושלם לסלון או למרפסת',
    image: '/api/placeholder/300/400',
    stock: 1
  },
  {
    id: 2,
    name: 'אגרטל קטן',
    nameEn: 'Small Vase',
    price: 89,
    description: 'אגרטל קומפקטי ומעוצב, אידיאלי לשולחן העבודה או המטבח',
    image: '/api/placeholder/300/400',
    stock: 1
  },
  {
    id: 3,
    name: 'מעמד לשעון אפל',
    nameEn: 'Apple Watch Stand',
    price: 69,
    description: 'מעמד מינימליסטי ואלגנטי לשעון החכם שלך',
    image: '/api/placeholder/300/400',
    stock: 2
  },
  {
    id: 4,
    name: 'מארגן כבלים',
    nameEn: 'Cable Organizer',
    price: 39,
    description: 'פתרון חכם לניהול כבלים בשולחן העבודה',
    image: '/api/placeholder/300/400',
    stock: 1
  }
];

const Madpis3D = () => {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inventory, setInventory] = useState(products);

  const getAvailableStock = (productId) => {
    const product = inventory.find(p => p.id === productId);
    const inCart = cart.filter(item => item.id === productId).length;
    return product.stock - inCart;
  };

  const addToCart = (product) => {
    const availableStock = getAvailableStock(product.id);
    if (availableStock > 0) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    const indexToRemove = cart.findIndex(item => item.id === productId);
    if (indexToRemove !== -1) {
      const newCart = [...cart];
      newCart.splice(indexToRemove, 1);
      setCart(newCart);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCartItemCount = (productId) => {
    return cart.filter(item => item.id === productId).length;
  };

  const handleCheckout = () => {
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=madpis3d@gmail.com&amount=${getTotalPrice()}&currency_code=ILS`;
    window.open(paypalUrl, '_blank');
  };

  const StockIndicator = ({ stock }) => {
    if (stock === 0) {
      return (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>אזל המלאי</AlertDescription>
        </Alert>
      );
    } else if (stock <= 3) {
      return (
        <Alert variant="warning" className="mt-2 bg-orange-50 text-orange-800 border-orange-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>נשארו {stock} יחידות במלאי</AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Madpis3D</h1>
            </div>
            
            {/* Cart Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px]" position="left">
                <SheetHeader>
                  <SheetTitle>העגלה שלי</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  {cart.length > 0 ? (
                    <>
                      {Array.from(new Set(cart.map(item => item.id))).map((productId) => {
                        const product = products.find(p => p.id === productId);
                        const quantity = getCartItemCount(productId);
                        return (
                          <div key={productId} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <span className="font-medium">{product.name}</span>
                              <div className="text-sm text-gray-500">
                                {quantity} × ₪{product.price}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span>₪{product.price * quantity}</span>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFromCart(productId)}
                              >
                                הסר
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      <div className="mt-4">
                        <div className="text-lg font-bold mb-4">
                          סה״כ: ₪{getTotalPrice()}
                        </div>
                        <Button
                          className="w-full"
                          onClick={handleCheckout}
                        >
                          לתשלום
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-500 mt-4">העגלה ריקה</p>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            הדפסות תלת מימד באיכות מעולה
          </h2>
          <p className="text-xl text-gray-600">
            מוצרים ייחודיים מותאמים אישית, מיוצרים בישראל
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const availableStock = getAvailableStock(product.id);
            const cartQuantity = getCartItemCount(product.id);
            
            return (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                  <StockIndicator stock={availableStock} />
                  {cartQuantity > 0 && (
                    <div className="mt-2 text-sm text-blue-600">
                      {cartQuantity} בעגלת הקניות
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                  <span className="text-lg font-bold">₪{product.price}</span>
                  <Button 
                    onClick={() => addToCart(product)}
                    disabled={availableStock === 0}
                  >
                    {availableStock === 0 ? 'אזל המלאי' : 'הוסף לעגלה'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Madpis3D © {new Date().getFullYear()}</p>
            <p>יצירת קשר: info@madpis3d.co.il</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
