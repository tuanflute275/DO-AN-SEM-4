# 📚 Comic App - Ứng Dụng Đọc Truyện Tranh

Dự án đồ án học kỳ 4 - Ứng dụng đọc truyện tranh online gồm 3 thành phần chính:

| Thành phần | Công nghệ | Mô tả |
|---|---|---|
| **API_Application** | ASP.NET Core 8, EF Core, SQL Server | Backend RESTful API |
| **admin-web-page** | React 18, Redux Toolkit, Bootstrap 5 | Trang quản trị (Admin) |
| **comic_reader** | Flutter (Dart ^3.5.3) | Ứng dụng đọc truyện (Mobile/Web) |

---

## 📐 Kiến Trúc Hệ Thống

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  comic_reader   │     │   admin-web-page     │     │   Database      │
│  (Flutter App)  │────▶│   (React Admin)      │     │  (SQL Server)   │
│  Mobile / Web   │     │  http://localhost:3000│     │  Db_Comic_App   │
└────────┬────────┘     └──────────┬───────────┘     └────────▲────────┘
         │                         │                          │
         │    ┌────────────────────┘                          │
         │    │                                               │
         ▼    ▼                                               │
┌─────────────────────────────────────┐                       │
│         API_Application             │                       │
│  https://localhost:7128 (HTTPS)     │───────────────────────┘
│  http://localhost:5248  (HTTP)      │
│  Swagger: /swagger                  │
└─────────────────────────────────────┘
```

---

## ⚙️ Yêu Cầu Cài Đặt

### Bắt buộc
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 trở lên)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express hoặc Developer)

### Tùy chọn (cho comic_reader)
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (v3.5.3 trở lên)
- Android Studio hoặc VS Code với Flutter extension

### Kiểm tra môi trường

```powershell
# Kiểm tra .NET
dotnet --version

# Kiểm tra Node.js
node --version
npm --version

# Kiểm tra Flutter (nếu cần)
flutter --version
flutter doctor
```

---

## 🚀 Hướng Dẫn Chạy Dự Án

> **⚠️ Quan trọng:** Phải chạy **API_Application** trước tiên vì đây là backend cung cấp dữ liệu cho 2 dự án còn lại.

### 1️⃣ API_Application (Backend API)

#### Bước 1: Cấu hình Connection String

Mở file `API_Application/appsettings.json` và chỉnh sửa connection string cho đúng với SQL Server trên máy bạn:

```json
{
  "ConnectionStrings": {
    "ConnStr": "Server=TEN_MAY\\SQLEXPRESS; Database=Db_Comic_App; User Id=sa; Password=YOUR_PASSWORD; Trusted_Connection=True; TrustServerCertificate=True; MultipleActiveResultSets=true;"
  }
}
```

> **Lưu ý:** Thay `TEN_MAY\\SQLEXPRESS` bằng tên SQL Server instance trên máy bạn, và `YOUR_PASSWORD` bằng mật khẩu sa.

#### Bước 2: Tạo Database (lần đầu)

```powershell
cd API_Application
dotnet restore
dotnet ef database update
```

> Nếu chưa cài `dotnet-ef`, chạy lệnh: `dotnet tool install --global dotnet-ef`

#### Bước 3: Chạy API

```powershell
cd API_Application
dotnet run
```

✅ API sẽ chạy tại:
- **HTTPS:** `https://localhost:7128`
- **HTTP:** `http://localhost:5248`
- **Swagger UI:** `https://localhost:7128/swagger`

---

### 2️⃣ admin-web-page (Trang Quản Trị)

```powershell
# Mở terminal mới
cd admin-web-page

# Cài đặt dependencies (chỉ cần lần đầu)
npm install

# Chạy ứng dụng
npm start
```

✅ Admin page sẽ chạy tại: **http://localhost:3000**

---

### 3️⃣ comic_reader (Ứng Dụng Flutter)

```powershell
# Mở terminal mới
cd comic_reader

# Tải dependencies (chỉ cần lần đầu hoặc khi thay đổi pubspec.yaml)
flutter pub get

# Chạy ứng dụng
flutter run
```

Flutter sẽ hỏi bạn chọn thiết bị. Một số tùy chọn:

```powershell
# Chạy trên trình duyệt Chrome
flutter run -d chrome

# Chạy trên Windows desktop
flutter run -d windows

# Chạy trên Android Emulator (cần cài Android Studio)
flutter run -d emulator-5554
```

✅ Ứng dụng sẽ khởi chạy trên thiết bị được chọn.

---

## 📋 Tổng Hợp Lệnh Nhanh

Mở **3 terminal riêng biệt** và chạy theo thứ tự:

```powershell
# Terminal 1 - Backend API (chạy trước)
cd API_Application
dotnet run

# Terminal 2 - Admin Web Page
cd admin-web-page
npm start

# Terminal 3 - Comic Reader (Flutter)
cd comic_reader
flutter run -d chrome
```

---

## 📁 Cấu Trúc Dự Án

```
Source/
├── API_Application/          # Backend API (.NET 8)
│   ├── Controllers/          # API Controllers
│   │   ├── ActorController       # Quản lý tác giả
│   │   ├── AuthController        # Xác thực (Login/Register)
│   │   ├── ComicController       # Quản lý truyện tranh
│   │   ├── DirectorController    # Quản lý đạo diễn
│   │   ├── EpisodeController     # Quản lý tập/chương
│   │   ├── EpisodeImagesController # Quản lý hình ảnh chương
│   │   ├── FavouriteController   # Quản lý yêu thích
│   │   ├── GenreController       # Quản lý thể loại
│   │   ├── HistoryController     # Lịch sử đọc
│   │   ├── ReviewController      # Đánh giá/bình luận
│   │   └── UserController        # Quản lý người dùng
│   ├── Core/                 # Models, Database Context, Interfaces
│   ├── Repositories/         # Data Access Layer
│   ├── Services/             # Business Logic Layer
│   ├── Extensions/           # Extension methods
│   ├── Migrations/           # EF Core Migrations
│   ├── Program.cs            # Entry point
│   └── appsettings.json      # Cấu hình ứng dụng
│
├── admin-web-page/           # Admin Dashboard (React)
│   └── src/
│       ├── components/
│       │   ├── layouts/      # Layout chung (Sidebar, Header)
│       │   └── pages/        # Các trang quản lý
│       │       ├── actor/        # CRUD Tác giả
│       │       ├── comic/        # CRUD Truyện tranh
│       │       ├── director/     # CRUD Đạo diễn
│       │       ├── episode/      # CRUD Tập/chương
│       │       ├── genre/        # CRUD Thể loại
│       │       ├── images/       # Quản lý hình ảnh
│       │       ├── reviews/      # Quản lý đánh giá
│       │       ├── user/         # Quản lý người dùng
│       │       └── home/         # Trang chủ Dashboard
│       ├── redux/            # Redux state management
│       ├── routes/           # React Router config
│       ├── services/         # API service calls
│       └── common/           # Shared utilities
│
├── comic_reader/             # Mobile/Web App (Flutter)
│   └── lib/
│       ├── main.dart         # Entry point
│       ├── models/           # Data models
│       ├── providers/        # State management (Provider)
│       ├── screens/          # Các màn hình
│       │   ├── home_screen           # Trang chủ
│       │   ├── anime_details_screen  # Chi tiết truyện
│       │   ├── episode_list_screen   # Danh sách chương
│       │   ├── view_chapter_images   # Đọc truyện
│       │   ├── comic_by_category     # Truyện theo thể loại
│       │   ├── anime_follow_page     # Truyện theo dõi
│       │   ├── history_screen        # Lịch sử đọc
│       │   ├── login_screen          # Đăng nhập
│       │   ├── register_screen       # Đăng ký
│       │   ├── profile_screen        # Hồ sơ cá nhân
│       │   └── change_password       # Đổi mật khẩu
│       ├── widgets/          # Reusable widgets
│       └── commons/          # Constants, utilities
│
└── README.md                 # File này
```

---

## 🔧 Xử Lý Lỗi Thường Gặp

### API_Application

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| `Cannot connect to SQL Server` | Sai connection string hoặc SQL Server chưa chạy | Kiểm tra tên server, user/password trong `appsettings.json`. Đảm bảo SQL Server service đang chạy |
| `dotnet ef not found` | Chưa cài EF Core tools | Chạy `dotnet tool install --global dotnet-ef` |
| `Port already in use` | Cổng đang bị chiếm | Đổi port trong `Properties/launchSettings.json` |

### admin-web-page

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| `npm install` lỗi | Node.js version cũ | Cập nhật Node.js lên v18+ |
| `CORS error` trên console | API chưa chạy hoặc sai URL | Đảm bảo API đang chạy, kiểm tra base URL trong `src/services/` |

### comic_reader

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| `flutter not recognized` | Chưa cài Flutter hoặc chưa thêm vào PATH | Cài Flutter SDK và thêm đường dẫn vào biến môi trường PATH |
| `No devices found` | Chưa có thiết bị/emulator | Chạy `flutter run -d chrome` để dùng Chrome, hoặc mở Android Emulator |

---

## 📄 License

MIT License - Xem file [LICENSE](API_Application/LICENSE.txt) để biết thêm chi tiết.
