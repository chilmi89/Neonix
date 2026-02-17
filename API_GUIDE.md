# API Configuration Guide

## 📁 Struktur File API

Sistem API telah diorganisir dengan struktur yang rapi dan mudah dikelola:

```
src/
├── config/
│   └── api.config.ts          # Konfigurasi pusat semua endpoint API
└── services/
    ├── authService.ts         # Service untuk autentikasi
    ├── userService.ts         # Service untuk manajemen user
    ├── productService.ts      # Service untuk manajemen produk
    ├── roleService.ts         # Service untuk manajemen role
    └── eventService.ts        # Service untuk manajemen event
```

## 🔧 Cara Mengubah IP Backend

Untuk mengubah IP backend (misalnya saat IP WiFi berubah), **cukup edit 1 file**:

**File: `src/config/api.config.ts`**

```typescript
// Ubah IP ini sesuai dengan IP WiFi localhost Anda
export const BASE_URL = "http://192.168.18.159:8080";
```

Semua service akan otomatis menggunakan IP yang baru!

## 📚 Cara Menggunakan Service di Frontend

### 1. Authentication Service

```typescript
import { login, register, logout } from "@/services/authService";

// Login
const handleLogin = async () => {
  try {
    const response = await login("user@example.com", "password123");
    console.log("Login berhasil:", response.data);
  } catch (error) {
    console.error("Login gagal:", error.message);
  }
};

// Register
const handleRegister = async () => {
  try {
    const response = await register({
      name: "John Doe",
      email: "john@example.com",
      password: "password123"
    });
    console.log("Register berhasil:", response.data);
  } catch (error) {
    console.error("Register gagal:", error.message);
  }
};

// Logout
const handleLogout = async () => {
  try {
    await logout();
    console.log("Logout berhasil");
  } catch (error) {
    console.error("Logout gagal:", error.message);
  }
};
```

### 2. User Service

```typescript
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "@/services/userService";

// Get all users dengan pagination
const fetchUsers = async () => {
  try {
    const response = await getAllUsers({ page: 1, limit: 10 });
    console.log("Users:", response.data.users);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Get user by ID
const fetchUser = async (id: number) => {
  try {
    const response = await getUserById(id);
    console.log("User:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Create user
const addUser = async () => {
  try {
    const response = await createUser({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
      roleId: 2
    });
    console.log("User created:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Update user
const editUser = async (id: number) => {
  try {
    const response = await updateUser(id, {
      name: "Jane Smith"
    });
    console.log("User updated:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Delete user
const removeUser = async (id: number) => {
  try {
    await deleteUser(id);
    console.log("User deleted");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### 3. Product Service

```typescript
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "@/services/productService";

// Get all products dengan filter
const fetchProducts = async () => {
  try {
    const response = await getAllProducts({
      page: 1,
      limit: 20,
      category: "electronics",
      minPrice: 100,
      maxPrice: 1000
    });
    console.log("Products:", response.data.products);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Create product
const addProduct = async () => {
  try {
    const response = await createProduct({
      name: "Laptop",
      description: "Gaming laptop",
      price: 15000000,
      category: "electronics",
      stock: 10
    });
    console.log("Product created:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### 4. Role Service

```typescript
import { getAllRoles, createRole, assignPermissionToRole } from "@/services/roleService";

// Get all roles
const fetchRoles = async () => {
  try {
    const response = await getAllRoles();
    console.log("Roles:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Assign permission to role
const assignPermission = async () => {
  try {
    await assignPermissionToRole(1, 5); // roleId: 1, permissionId: 5
    console.log("Permission assigned");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### 5. Event Service

```typescript
import { getAllEvents, getUpcomingEvents, createEvent } from "@/services/eventService";

// Get upcoming events
const fetchUpcomingEvents = async () => {
  try {
    const response = await getUpcomingEvents();
    console.log("Upcoming events:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Create event
const addEvent = async () => {
  try {
    const response = await createEvent({
      title: "Tech Conference 2026",
      description: "Annual tech conference",
      location: "Jakarta Convention Center",
      startDate: "2026-03-15T09:00:00",
      endDate: "2026-03-17T18:00:00",
      maxParticipants: 500
    });
    console.log("Event created:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

## 🎯 Keuntungan Sistem Ini

1. **Centralized Configuration**: Semua endpoint API ada di satu file (`api.config.ts`)
2. **Easy IP Change**: Ubah IP backend cukup di satu tempat
3. **Type Safety**: Semua service menggunakan TypeScript dengan interface yang jelas
4. **Reusable Functions**: Frontend tinggal import dan panggil fungsi yang dibutuhkan
5. **Consistent Error Handling**: Semua service memiliki error handling yang konsisten
6. **Auto Token Management**: Token JWT otomatis disimpan dan dikirim di setiap request

## 🔐 Authentication Token

Token JWT otomatis dikelola oleh `authService`:
- Saat login berhasil, token disimpan di `localStorage`
- Setiap request ke API otomatis menyertakan token di header `Authorization`
- Saat logout, token otomatis dihapus

## 📝 Catatan Penting

- Pastikan backend API Anda sudah berjalan di IP yang dikonfigurasi
- Endpoint API di backend harus sesuai dengan yang didefinisikan di `api.config.ts`
- Jika ada endpoint baru, tambahkan di `api.config.ts` dan buat fungsi di service yang sesuai
