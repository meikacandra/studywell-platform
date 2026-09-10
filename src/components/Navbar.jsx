import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Hourglass, 
  Bell, 
  ChevronDown, 
  User, 
  RefreshCw, 
  UserPlus, 
  LogOut, 
  X, 
  Check,
  AlertTriangle,
  Target,
  Flame,
  Calendar,
  CheckCheck
} from "lucide-react";
import { useUser } from "../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const { 
    currentUser, 
    users, 
    switchUser, 
    addUser, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useUser();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for "Tambah Akun"
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("");

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Learning Mapping & Progress", path: "/study-mapping" },
    { name: "Well-being", path: "/wellbeing" },
  ];

  const checkIsActive = (itemPath) => {
    if (itemPath === "/") {
      return path === "/" || path === "/dashboard";
    }
    if (itemPath === "/wellbeing") {
      return path === "/wellbeing" || path === "/well-being";
    }
    return path === itemPath;
  };

  // Click outside detection for dropdown & notification popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwitchAccount = (userId) => {
    switchUser(userId);
    setIsSwitchModalOpen(false);
    setIsDropdownOpen(false);
  };

  const handleAddAccountSubmit = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    
    addUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole || "Siswa SMA"
    });

    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("");
    setIsAddModalOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const handleNotifClick = (notif) => {
    markAsRead(notif.id);
    setIsNotifOpen(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-content">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand">
            <div className="logo-icon-wrapper">
              <Hourglass className="logo-icon" size={20} />
            </div>
            <span className="logo-text">StudyWell</span>
          </Link>

          {/* Navigation Links */}
          <nav className="navbar-links">
            {navItems.map((item) => {
              const isActive = checkIsActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {item.name}
                  {isActive && <div className="active-indicator" />}
                </Link>
              );
            })}
          </nav>

          {/* User Actions, Notifications & Account Dropdown */}
          <div className="navbar-actions">
            {/* Notification Bell Button & Popover */}
            <div className="notification-wrapper" ref={notifRef}>
              <button 
                className="icon-btn" 
                aria-label="Notifications"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
              >
                <Bell size={20} color="#ffffff" />
                {unreadCount > 0 && (
                  <span className="notification-count-badge">{unreadCount}</span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotifOpen && (
                <div className="notif-dropdown-menu">
                  <div className="notif-header-row">
                    <div className="notif-title-group">
                      <Bell size={16} className="notif-header-icon" />
                      <span>Notifikasi</span>
                      {unreadCount > 0 && (
                        <span className="notif-count-pill">{unreadCount} baru</span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        className="notif-mark-all-btn"
                        onClick={markAllAsRead}
                      >
                        <CheckCheck size={13} />
                        <span>Tandai Dibaca</span>
                      </button>
                    )}
                  </div>

                  <div className="notif-list-container">
                    {notifications.length === 0 ? (
                      <div className="notif-empty-state">
                        <Bell size={24} className="empty-bell-icon" />
                        <p>Belum ada notifikasi baru.</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`notif-card-item ${notif.isUnread ? "unread-item" : ""}`}
                          onClick={() => handleNotifClick(notif)}
                        >
                          <div className={`notif-icon-box icon-box-${notif.type}`}>
                            {notif.type === "warning" && <AlertTriangle size={15} />}
                            {notif.type === "target" && <Target size={15} />}
                            {notif.type === "achievement" && <Flame size={15} />}
                            {notif.type === "assessment" && <Calendar size={15} />}
                          </div>
                          <div className="notif-body-content">
                            <div className="notif-title-row">
                              <span className="notif-item-title">{notif.title}</span>
                              {notif.isUnread && <span className="notif-dot-unread" />}
                            </div>
                            <p className="notif-item-msg">{notif.message}</p>
                            <span className="notif-item-time">{notif.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Account Menu Button */}
            <div className="user-profile-wrapper" ref={dropdownRef}>
              <div 
                className="user-profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                role="button"
                tabIndex={0}
              >
                <div className="avatar-circle">{currentUser.avatar || "F"}</div>
                <span className="user-name">{currentUser.name}</span>
                <ChevronDown 
                  size={16} 
                  className="chevron-icon" 
                  style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                />
              </div>

              {/* Account Dropdown Menu */}
              {isDropdownOpen && (
                <div className="account-dropdown-menu">
                  {/* Header Card: User Info */}
                  <div className="dropdown-header-card">
                    <div className="dropdown-avatar-circle">{currentUser.avatar || "F"}</div>
                    <div className="dropdown-user-details">
                      <span className="dropdown-user-name">{currentUser.name}</span>
                      <span className="dropdown-user-email">
                        {currentUser.email || `${currentUser.name.toLowerCase()}@email.com`}
                      </span>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  {/* Menu Options */}
                  <div className="dropdown-menu-list">

                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsSwitchModalOpen(true);
                      }}
                      className="dropdown-item-btn"
                    >
                      <RefreshCw size={16} />
                      <span>Ganti Akun</span>
                    </button>

                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsAddModalOpen(true);
                      }}
                      className="dropdown-item-btn"
                    >
                      <UserPlus size={16} />
                      <span>Tambah Akun</span>
                    </button>

                    <div className="dropdown-divider" />

                    <button 
                      onClick={handleLogout}
                      className="dropdown-item-btn logout-item"
                    >
                      <LogOut size={16} />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal 1: Ganti Akun */}
      {isSwitchModalOpen && (
        <div className="account-modal-overlay">
          <div className="account-modal-card">
            <div className="modal-header-row">
              <h3 className="modal-title">Pilih Akun Pengguna</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setIsSwitchModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="user-switch-list">
              {users.map((user) => {
                const isActive = user.id === currentUser.id;
                return (
                  <div 
                    key={user.id}
                    className={`user-switch-card ${isActive ? "active-switch-card" : ""}`}
                    onClick={() => handleSwitchAccount(user.id)}
                  >
                    <div className="switch-card-left">
                      <div className="switch-avatar">{user.avatar || "U"}</div>
                      <div className="switch-info">
                        <span className="switch-name">{user.name}</span>
                        <span className="switch-email">{user.email || `${user.name.toLowerCase()}@email.com`}</span>
                      </div>
                    </div>
                    {isActive && <Check size={18} color="#2563eb" strokeWidth={3} />}
                  </div>
                );
              })}
            </div>

            <div className="modal-actions-row">
              <button 
                className="btn-secondary-cancel"
                onClick={() => setIsSwitchModalOpen(false)}
              >
                Tutup
              </button>
              <button 
                className="btn-primary-submit"
                onClick={() => {
                  setIsSwitchModalOpen(false);
                  setIsAddModalOpen(true);
                }}
              >
                + Tambah Akun Baru
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Tambah Akun */}
      {isAddModalOpen && (
        <div className="account-modal-overlay">
          <div className="account-modal-card">
            <div className="modal-header-row">
              <h3 className="modal-title">Tambah Akun Baru</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAccountSubmit} className="add-user-form">
              <div className="form-field-group">
                <label>Nama Lengkap</label>
                <input 
                  type="text"
                  placeholder="Contoh: Rian Pratama"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Alamat Email</label>
                <input 
                  type="email"
                  placeholder="Contoh: rian@email.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Peran / Peminatan</label>
                <input 
                  type="text"
                  placeholder="Contoh: Siswa SMA / Persiapan SNBT"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                />
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button"
                  className="btn-secondary-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="btn-primary-submit"
                >
                  Simpan &amp; Gunakan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
