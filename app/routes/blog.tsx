import Header from "~/components/Header";

export function meta() {
  return [{ title: "Blog | The Online Store" }];
}

export default function BlogPage() {
  return (
    <>
      <Header variant="home" />

      <main className="site-shell site-shell--home placeholder-page">
        <div className="page-label">Blog</div>

        <section className="placeholder-panel">
          <h1 className="placeholder-panel__title">Blog coming soon</h1>
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
