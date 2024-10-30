"use client";
import Link from 'next/link';

const Home = () => {
    const items = [
        { id: 1, slug: 'health-inc' },
        { id: 2, slug: 'health-inc' },
    ];

    return (
        <div>
            <h1>Home Page</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                {items.map(item => (
                    <Link key={item.slug} href={`/company-profile/${item.slug}`}>
                        <div style={{ border: '1px solid #ccc', padding: '20px', cursor: 'pointer' }}>
                            <h2>{item.slug}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;