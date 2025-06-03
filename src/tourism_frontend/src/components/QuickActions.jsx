const QuickActions = ({ onNavigate }) => (
  <section className="quick-actions" aria-label="Quick action buttons">
    <h2>Quick Actions</h2>
    <div className="actions-grid">
      <button onClick={() => onNavigate('/map')}>
        <i className="fas fa-map-marked-alt" aria-hidden="true"></i>
        Explore Map
      </button>
      <button onClick={() => onNavigate('/site')}>
        <i className="fas fa-compass" aria-hidden="true"></i>
        Browse Sites
      </button>
      <button onClick={() => onNavigate('/shop')}>
        <i className="fas fa-store" aria-hidden="true"></i>
        Visit Shop
      </button>
      <button onClick={() => onNavigate('/profile')}>
        <i className="fas fa-user" aria-hidden="true"></i>
        View Profile
      </button>
    </div>
  </section>
);
export default QuickActions;