# Task Board App

Frontend ของโปรแกรมจัดการงาน (Task Board) สำหรับ **ENGSE207 Software Architecture - Week 3 Lab**

แอปนี้ช่วยให้ผู้ใช้สามารถสร้าง แก้ไข ลบ และจัดการงานตามสถานะ **To Do**, **In Progress**, และ **Done** ผ่านหน้าเว็บ

---

## 📋 คุณสมบัติหลัก

* สร้างงานใหม่ (Title, Description, Priority)
* แก้ไขสถานะงาน: `TODO`, `IN_PROGRESS`, `DONE`
* ลบงาน
* แสดงจำนวนงานในแต่ละสถานะ
* กรองงานตามสถานะ
* รองรับการโหลดข้อมูลจาก API และแสดง loading overlay

---

## ⚙️ การติดตั้ง

1. Clone โปรเจกต์:

```bash
git clone <repository-url>
```

2. เปิดไฟล์ `index.html` ในเบราว์เซอร์ หรือรันเซิร์ฟเวอร์สำหรับทดสอบ (เช่น `Live Server` บน VS Code)

3. ต้องมี **backend API** ที่รองรับ endpoint:

* `GET /api/tasks` → ดึงรายการงานทั้งหมด
* `POST /api/tasks` → สร้างงานใหม่
* `PATCH /api/tasks/:id/status` → อัปเดตสถานะงาน
* `DELETE /api/tasks/:id` → ลบงาน

---

## 📝 การใช้งาน

### 1. สร้างงานใหม่

1. กรอก **Title** และ **Description** (ไม่จำเป็น)
2. เลือก **Priority** (Low, Medium, High)
3. กดปุ่ม **Add Task**

> งานจะถูกเพิ่มลงในคอลัมน์ `To Do` โดยอัตโนมัติ

---

### 2. แก้ไขสถานะงาน

* ใช้ปุ่มสถานะบนแต่ละการ์ด:

  * `← To Do` → ย้ายกลับไป To Do
  * `→ In Progress` / `← In Progress` → ย้ายไป In Progress
  * `→ Done` → ย้ายไป Done

> ระบบจะเรียก API เพื่ออัปเดตสถานะ และรีเฟรชหน้าจอ

---

### 3. ลบงาน

* กดปุ่ม **🗑️ Delete** บนการ์ดงาน
* ระบบจะถามยืนยัน ก่อนลบ
* เมื่อสำเร็จ งานจะถูกลบจากหน้าเว็บทันที

---

### 4. การกรองงาน

* ใช้ **Status Filter** ด้านบนเพื่อกรองงานตามสถานะ:

  * `ALL` → แสดงงานทุกสถานะ
  * `TODO`, `IN_PROGRESS`, `DONE` → แสดงเฉพาะงานตามสถานะที่เลือก

---

## 🛠️ โครงสร้างหลักของโปรแกรม

* **State Management**

  * ตัวแปร `allTasks` เก็บงานทั้งหมด
  * ตัวแปร `currentFilter` เก็บสถานะที่กำลังกรอง
* **DOM Elements**

  * การอ้างอิงฟอร์ม เพิ่มงาน
  * คอนเทนเนอร์แสดงงานแต่ละคอลัมน์
  * ตัวนับจำนวนงาน
* **Utility Functions**

  * `escapeHtml()` → ป้องกัน XSS
  * `formatDate()` → แปลงวันที่ให้สวยงาม
  * `showLoading()` / `hideLoading()` → แสดง overlay
* **API Functions**

  * `fetchTasks()` → ดึงงานจาก backend
  * `createTask()` → เพิ่มงานใหม่
  * `updateTaskStatus()` → เปลี่ยนสถานะงาน
  * `deleteTask()` → ลบงาน
* **Render Functions**

  * `createTaskCard()` → สร้าง HTML การ์ดงาน
  * `renderTaskList()` → แสดงงานในคอลัมน์
  * `renderTasks()` → รีเฟรชหน้าเว็บทั้งหมด
* **Event Listeners**

  * Form submission สำหรับสร้างงาน
  * Dropdown filter สำหรับกรองงาน

---

## 🚀 เริ่มต้นใช้งาน

1. เปิดหน้าเว็บ
2. ระบบจะโหลดงานจาก API อัตโนมัติ
3. ใช้งานฟีเจอร์ต่าง ๆ ผ่าน UI

---

## ⚠️ หมายเหตุ

* แอปนี้เป็น **Frontend Monolithic** ใช้ Vanilla JS, HTML, CSS
* Backend API ต้องมี endpoint ที่กำหนดไว้ข้างต้น
* การกรองและการอัปเดตสถานะทำที่ **Frontend** ก่อนส่ง request ไปยัง API
