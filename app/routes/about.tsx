import Header from "~/components/Header";

export function meta() {
  return [{ title: "About | The Online Store" }];
}

export default function AboutPage() {
  return (
    <>
      <Header variant="home" />

      <main className="site-shell site-shell--home placeholder-page">
        <div className="page-label">About</div>

        <section className="placeholder-panel">
          <h1 className="placeholder-panel__title">About coming soon</h1>
          <p className="placeholder-panel__text">
            This section is intentionally left as a placeholder to keep the
            store navigation complete while preserving the challenge focus on
            homepage, product detail, and cart.
          </p>
        </section>
      </main>
    </>
  );
}