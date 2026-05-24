'use client';

import { useEffect, useState } from 'react';

interface Stock {
  warehouseId: string;
  warehouse: string;
  totalStock: number;
  reservedStock: number;
  availableStock: number;
}

interface Product {
  id: string;
  name: string;
  stock: Stock[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState('');

  async function loadProducts() {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function reserveProduct(
    productId: string,
    warehouseId: string
  ) {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        warehouseId,
        quantity: 1,
      }),
    });

    if (response.ok) {
      setMessage('✅ Reservation Successful!');
      loadProducts();
    } else {
      setMessage('❌ Reservation Failed');
    }
  }

  const totalProducts = products.length;

  const totalWarehouses = products.reduce(
    (acc, p) => acc + p.stock.length,
    0
  );

  const totalAvailable = products.reduce(
    (acc, p) =>
      acc +
      p.stock.reduce(
        (sum, s) => sum + s.availableStock,
        0
      ),
    0
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to right,#0f172a,#1e3a8a,#0f172a)',
        color: 'white',
        fontFamily: 'Arial',
      }}
    >
      {/* NAVBAR */}

      <div
        style={{
          padding: '20px 50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            margin: 0,
          }}
        >
          📦 SmartInventory AI
        </h1>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            fontSize: '18px',
          }}
        >
          <span>Dashboard</span>
          <span>Warehouses</span>
          <span>Analytics</span>
        </div>
      </div>

      {/* HERO */}

      <div
        style={{
          padding: '60px 50px 30px',
        }}
      >
        <h1
          style={{
            fontSize: '58px',
            marginBottom: '10px',
          }}
        >
          Multi-Warehouse Inventory Platform
        </h1>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '20px',
          }}
        >
          Real-time inventory reservation and stock tracking
          system using Next.js + Prisma + Neon PostgreSQL
        </p>
      </div>

      {/* STATS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(250px,1fr))',
          gap: '20px',
          padding: '20px 50px',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h2>📦 Products</h2>
          <h1>{totalProducts}</h1>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h2>🏬 Warehouses</h2>
          <h1>{totalWarehouses}</h1>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h2>📊 Available Stock</h2>
          <h1>{totalAvailable}</h1>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div
          style={{
            margin: '30px 50px',
            background: '#16a34a',
            padding: '18px',
            borderRadius: '14px',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          {message}
        </div>
      )}

      {/* PRODUCTS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(450px,1fr))',
          gap: '30px',
          padding: '20px 50px 60px',
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '25px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            {/* IMAGE */}

            <div
              style={{
                height: '250px',
                backgroundImage:
                  index === 0
                    ? 'url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop)'
                    : 'url(https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <div style={{ padding: '25px' }}>
              <h1
                style={{
                  fontSize: '40px',
                  marginBottom: '20px',
                }}
              >
                {product.name}
              </h1>

              {product.stock.map((inventory) => (
                <div
                  key={inventory.warehouseId}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    padding: '20px',
                    borderRadius: '18px',
                    marginBottom: '20px',
                  }}
                >
                  <h2>
                    🏬 {inventory.warehouse}
                  </h2>

                  <p>
                    Total Stock:
                    <strong>
                      {' '}
                      {inventory.totalStock}
                    </strong>
                  </p>

                  <p>
                    Reserved:
                    <strong>
                      {' '}
                      {inventory.reservedStock}
                    </strong>
                  </p>

                  <p
                    style={{
                      color:
                        inventory.availableStock <= 2
                          ? '#ef4444'
                          : '#22c55e',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    Available:
                    {inventory.availableStock}
                  </p>

                  {inventory.availableStock <= 2 && (
                    <div
                      style={{
                        background: '#dc2626',
                        padding: '10px',
                        borderRadius: '10px',
                        marginBottom: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      ⚠ Low Stock Alert
                    </div>
                  )}

                  <button
                    onClick={() =>
                      reserveProduct(
                        product.id,
                        inventory.warehouseId
                      )
                    }
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: 'none',
                      background:
                        'linear-gradient(to right,#2563eb,#3b82f6)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    🚀 Reserve Product
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}

      <div
        style={{
          textAlign: 'center',
          padding: '30px',
          color: '#cbd5e1',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        Built with Next.js • Prisma • Neon PostgreSQL
      </div>
    </div>
  );
}