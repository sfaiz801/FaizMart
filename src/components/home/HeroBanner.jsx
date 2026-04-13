'use client';
// Hero section with animated headline, CTA buttons, floating stat cards
import Link from 'next/link';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left: text */}
          <div className={styles.content}>
            <span className={styles.pill}>New Season — Up to 50% Off</span>
            <h1 className={styles.headline}>
              Find Products<br />
              You <em>Actually</em> Love
            </h1>
            <p className={styles.sub}>
              Curated collections across electronics, fashion & home.
              Fast shipping. Easy returns. Prices that make sense.
            </p>
            <div className={styles.ctas}>
              <Link href="/shop" className="sn-btn sn-btn--primary sn-btn--lg">
                Shop Now
              </Link>
              <Link href="/shop?category=smartphones" className="sn-btn sn-btn--ghost sn-btn--lg">
                Explore Electronics
              </Link>
            </div>
            <div className={styles.stats}>
              {[['50K+', 'Products'], ['1M+', 'Customers'], ['4.8★', 'Rating']].map(([n, l]) => (
                <div key={l} className={styles.stat}>
                  <strong>{n}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div className={styles.visual}>
            <div className={styles.ring} />
            <div className={styles.ringInner} />
            <div className={styles.emoji}>🛍️</div>
            <div className={styles.floatA}>
              <span>🚚</span>
              <div><strong>Free Shipping</strong><p>Orders above $50</p></div>
            </div>
            <div className={styles.floatB}>
              <span>⚡</span>
              <div><strong>Flash Deals</strong><p>Every weekend</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
