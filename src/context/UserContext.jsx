import React, { createContext, useContext, useState } from "react";
import { mockUsers, mockUserHistories } from "../data/userLearningData";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(mockUsers);
  const [currentUserId, setCurrentUserId] = useState("user-001");

  const currentUser = users.find((u) => u.id === currentUserId) || users[0];

  const switchUser = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser) {
      setCurrentUserId(userId);
    }
  };

  const addUser = ({ name, email, role, bio }) => {
    const newId = `user-${Date.now()}`;
    const avatar = name.trim() ? name.trim()[0].toUpperCase() : "U";
    
    const newUser = {
      id: newId,
      name: name.trim(),
      email: email.trim(),
      role: role || "Siswa SMA",
      avatar,
      bio: bio || "Pengguna Baru StudyWell"
    };

    // Create initial realistic 7-day history for the new user
    mockUserHistories[newId] = [
      { date: "2026-09-02", day: "Senin", sleepHours: 7.5, studyDuration: 2.5, burnout: 2 },
      { date: "2026-09-03", day: "Selasa", sleepHours: 8.0, studyDuration: 3.0, burnout: 3 },
      { date: "2026-09-04", day: "Rabu", sleepHours: 7.0, studyDuration: 3.5, burnout: 4 },
      { date: "2026-09-05", day: "Kamis", sleepHours: 7.8, studyDuration: 2.8, burnout: 2 },
      { date: "2026-09-06", day: "Jumat", sleepHours: 8.2, studyDuration: 2.0, burnout: 1 },
      { date: "2026-09-07", day: "Sabtu", sleepHours: 8.5, studyDuration: 1.5, burnout: 1 },
      { date: "2026-09-08", day: "Minggu", sleepHours: 7.5, studyDuration: 3.0, burnout: 2 }
    ];

    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newId);
    return newUser;
  };

  const updateUserProfile = (userId, updatedFields) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const newName = updatedFields.name !== undefined ? updatedFields.name.trim() : user.name;
          const avatar = newName ? newName[0].toUpperCase() : user.avatar;
          return {
            ...user,
            ...updatedFields,
            name: newName,
            avatar
          };
        }
        return user;
      })
    );
  };

  const deleteAccount = (userId) => {
    if (users.length <= 1) {
      alert("Tidak dapat menghapus akun terakhir!");
      return false;
    }
    const remainingUsers = users.filter((u) => u.id !== userId);
    setUsers(remainingUsers);
    if (currentUserId === userId) {
      setCurrentUserId(remainingUsers[0].id);
    }
    return true;
  };

  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Risiko Kelelahan Terdeteksi",
      message: "Jam tidur semalam 4,5 jam & beban 80%. Disarankan istirahat 15m sebelum sesi belajar berikutnya.",
      time: "10m yang lalu",
      type: "warning",
      isUnread: true,
      link: "/wellbeing"
    },
    {
      id: "notif-2",
      title: "Target Belajar Adaptif Siap",
      message: "Modul 'Fungsi & Relasi' masih di bawah 50% (Learning Gap). Rekomendasi sesi 35m siap.",
      time: "1j yang lalu",
      type: "target",
      isUnread: true,
      link: "/study-mapping"
    },
    {
      id: "notif-3",
      title: "Streak Belajar 5 Hari!",
      message: "Selamat! Kamu berhasil menjaga konsistensi dan keseimbangan ritme belajar.",
      time: "3j yang lalu",
      type: "achievement",
      isUnread: true,
      link: "/dashboard"
    },
    {
      id: "notif-4",
      title: "Re-assessment Evaluasi M2",
      message: "Jadwal evaluasi berkala telah tiba. Ukur penguasaan materi Trigonometri.",
      time: "Kemarin",
      type: "assessment",
      isUnread: false,
      link: "/profile"
    }
  ]);

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const markAsRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, isUnread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        switchUser,
        addUser,
        updateUserProfile,
        deleteAccount,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
