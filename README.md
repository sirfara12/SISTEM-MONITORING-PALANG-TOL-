# Sistem Monitoring Akses Palang Tol dan Analisis Lalu Lintas Berbasis IoT, Cloud Computing, Big Data, dan Framework Next.js.


## Deskripsi
Proyek ini merupakan prototype sistem gerbang tol otomatis pintar yang mengintegrasikan teknologi **IoT, Cloud Computing, Big Data, dan Next.js** untuk memonitor akses kendaraan serta menganalisis lalu lintas secara **real-time**.

Sistem dirancang untuk mendigitalisasi pencatatan akses kendaraan dan memantau status palang pintu secara langsung melalui dashboard terpusat.

---

## Gambaran Umum
Sistem menggunakan **ESP32** yang terhubung dengan **sensor RFID** sebagai alat identifikasi kendaraan.

Alur kerja sistem:
1. Pengguna melakukan tap kartu RFID  
2. UID kartu dibaca oleh sensor  
3. Data dikirim ke server (Cloud) untuk validasi  
4. Jika valid → palang terbuka  
5. Jika tidak valid → akses ditolak  

Seluruh data akses dikirim secara real-time ke cloud untuk memastikan:
- High availability  
- Continuous data streaming  
- Skalabilitas sistem  

---

## Teknologi yang Digunakan
- **IoT**: ESP32, RFID, Motor Servo, Sensor Ultrasonik  
- **Cloud Computing**: Backend server & database  
- **Big Data**: Analisis volume kendaraan & traffic  
- **Web**: Next.js (Dashboard & visualisasi data)  

---

## Fitur Utama

###  1. Dashboard Monitoring (Real-Time)
- Status palang (**TERBUKA / TERTUTUP**)  
- Live transaksi kartu RFID  
- Validasi akses ( diterima / ditolak)  
- Remote control palang (manual override)  
- Monitoring dua gerbang (masuk & keluar)  
- Indikator kemacetan (Hijau, Kuning, Merah)  
- Live counter kendaraan  

---

###  2. Visualisasi Analitik
- Grafik volume kendaraan (per jam / harian)  
- Perbandingan akses sukses vs gagal  
- Statistik performa sistem (latency)  
- Heatmap lalu lintas mingguan  
- Estimasi waktu antrean kendaraan  
- Komparasi kendaraan masuk vs keluar  

---

###  3. Manajemen Data (CRUD)
- Tambah / hapus / lihat kartu RFID  
- Daftar kartu terdaftar  
- Export log ke **CSV / PDF**  

---

###  4. Sistem Perangkat & Sensor
- RFID → identifikasi kendaraan  
- Ultrasonik → deteksi jarak & antrean  
- Dual-node system (gerbang masuk & keluar)  
- Deteksi kepadatan kendaraan  

---

##  Tujuan
- Meningkatkan efisiensi operasional gerbang tol  
- Mengurangi antrean kendaraan  
- Memberikan insight berbasis data  
- Mendukung digitalisasi transportasi  

---

##  Kesimpulan
Sistem ini menggabungkan integrasi hardware dan software dalam satu ekosistem cerdas yang mampu:
- Monitoring real-time  
- Pengolahan data skala besar  
- Visualisasi data interaktif  

---

##  Author
- Kelompok 5  
- Politeknik Negeri Malang  
