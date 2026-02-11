import { OrganizationProfile, Post, CabinetMember, PaginatedResponse, ApiResponse } from '../types';
import { MOCK_DELAY } from '../constants';

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- REAL DATA SOURCE ---
const RAW_DATA = {
  "organization": {
    "id": 1,
    "name": "BEM FST UNISA",
    "logo": null,
    "description": "Badan Eksekutif Mahasiswa FST UNISA",
    "address": "Jl. Universitas No. 1",
    "email": "bem@fst.unisa.ac.id",
    "phone": "08123456789",
    "social_media": {
      "twitter": "https://twitter.com/bemfeb",
      "youtube": "https://youtube.com/@bemfeb",
      "facebook": "https://facebook.com/bemfeb",
      "instagram": "https://instagram.com/bemfeb"
    },
    "created_at": "2026-02-09T15:24:25.000000Z",
    "updated_at": "2026-02-09T15:24:25.000000Z"
  },
  "active_period": {
    "id": 1,
    "year_start": 2025,
    "year_end": 2026,
    "is_active": true,
    "created_at": "2026-02-09T15:24:25.000000Z",
    "updated_at": "2026-02-09T15:24:25.000000Z"
  },
  "active_cabinet": {
    "id": 1,
    "period_id": 1,
    "name": "Kabinet Loyalist Spectra",
    "tagline": "Inklusif, pengembangan SDM, kaderisasi",
    "vision": "Menjadikan BEM FST UNISA sebagai organisasi yang terbuka, maju, dan bekerja sama untuk mendukung pengembangan potensi mahasiswa serta membangun kaderisasi berkelanjutan guna menciptakan generasi yang kreatif, inovatif.",
    "mission": "1. Menciptakan lingkungan yang inklusif dan ramah bagi semua mahasiswa tanpa terkecuali, sehingga terwujud suasana kolaborasi yang harmonis dan saling mendukung.\n2. Mengembangkan sumber daya manusia (SDM) mahasiswa melalui program-program yang meningkatkan keterampilan akademik, profesional, dan kepemimpinan.\n3. Memperkuat sistem kaderisasi yang relevan dengan perkembangan zaman, agar tercipta regenerasi kepemimpinan yang berkualitas, berintegritas, dan siap menghadapi tantangan masa depan.\n4. Mendorong kerja sama dan sinergi dengan Himpunan Program Studi (Himpunan Prodi) dalam merancang program kerja yang sesuai dengan kebutuhan mahasiswa serta perkembangan ilmu pengetahuan dan teknologi.\n5. Memberikan wadah bagi mahasiswa untuk mengeksplorasi minat, bakat, dan kreativitas, serta mendukung kegiatan riset dan pengabdian masyarakat.\n6. Meningkatkan peran BEM FST UNISA dalam menyuarakan aspirasi dan kebutuhan mahasiswa, serta memastikan kebijakan yang berpihak pada kesejahteraan mahasiswa dapat diwujudkan.",
    "created_at": "2026-02-09T15:24:33.000000Z",
    "updated_at": "2026-02-09T15:24:33.000000Z",
    "period": {
      "id": 1,
      "year_start": 2025,
      "year_end": 2026,
      "is_active": true,
      "created_at": "2026-02-09T15:24:25.000000Z",
      "updated_at": "2026-02-09T15:24:25.000000Z"
    },
    "divisions": [
      {
        "id": 1,
        "cabinet_id": 1,
        "name": "Inti",
        "members": [
          { "id": 1, "name": "Dimas Riski Setyaji", "prodi": "Teknologi Informasi", "position": "Gubernur" },
          { "id": 2, "name": "Raihan Nasrullah", "prodi": "Arsitektur", "position": "Wakil Gubernur" },
          { "id": 3, "name": "Indah Cahya Ningrum", "prodi": "Bioteknologi", "position": "Sekretaris Umum" },
          { "id": 4, "name": "Meira Dwi Amanda K", "prodi": "Bioteknologi", "position": "Sekretaris 1" },
          { "id": 5, "name": "Rini Sintia Rahmawati", "prodi": "Bioteknologi", "position": "Bendahara Umum" },
          { "id": 6, "name": "Fitri Dalima Shaleh", "prodi": "Arsitektur", "position": "Bendahara 1" }
        ]
      },
      {
        "id": 2,
        "cabinet_id": 1,
        "name": "Dagri",
        "members": [
          { "id": 7, "name": "Hasta Firmansyah", "prodi": "Bioteknologi", "position": "Kepala Departemen" },
          { "id": 8, "name": "Bella Aurelia Dewi", "prodi": "Bioteknologi", "position": "Sekretaris Departemen" },
          { "id": 9, "name": "Rahma Aulia Wailissa", "prodi": "Arsitektur", "position": "Staff" },
          { "id": 10, "name": "Nabila Aulia Ramadhani", "prodi": "Bioteknologi", "position": "Staff" }
        ]
      },
      {
        "id": 3,
        "cabinet_id": 1,
        "name": "Deplu",
        "members": [
          { "id": 11, "name": "Yudha Tirtadani", "prodi": "Bioteknologi", "position": "Kepala Departemen" },
          { "id": 12, "name": "Hilman Satia Pebria", "prodi": "Teknologi Informasi", "position": "Sekretaris Departemen" },
          { "id": 13, "name": "Naila Bintang Berlian", "prodi": "Arsitektur", "position": "Staff" },
          { "id": 14, "name": "Maulana Rivaldo P", "prodi": "Teknologi Informasi", "position": "Staff" }
        ]
      },
      {
        "id": 4,
        "cabinet_id": 1,
        "name": "Kastrad",
        "members": [
          { "id": 15, "name": "Yunan singgih", "prodi": "Teknologi Informasi", "position": "Kepala Departemen" },
          { "id": 16, "name": "Sindy Wulandari", "prodi": "Bioteknologi", "position": "Sekretaris Departemen" },
          { "id": 17, "name": "Nailah", "prodi": "Arsitektur", "position": "Staff" },
          { "id": 18, "name": "Anjar Awang M", "prodi": "Arsitektur", "position": "Staff" }
        ]
      },
      {
        "id": 5,
        "cabinet_id": 1,
        "name": "Porsa",
        "members": [
          { "id": 19, "name": "Aditya Cahyadi", "prodi": "Teknologi Informasi", "position": "Kepala Departemen" },
          { "id": 20, "name": "Rifkia Aska Maulani", "prodi": "Bioteknologi", "position": "Sekretaris Departemen" },
          { "id": 21, "name": "Faiz Naufal Putra Guntur", "prodi": "Teknologi Informasi", "position": "Staff" },
          { "id": 22, "name": "Muhammad Nafis Firdaus", "prodi": "Teknologi Informasi", "position": "Staff" },
          { "id": 23, "name": "Aisyah Dwi Astuti", "prodi": "Bioteknologi", "position": "Staff" }
        ]
      },
      {
        "id": 6,
        "cabinet_id": 1,
        "name": "Kominfo",
        "members": [
          { "id": 24, "name": "Muhammad Satrioadi", "prodi": "Teknologi Informasi", "position": "Kepala Departemen" },
          { "id": 25, "name": "Nuzulul Abdillah Amar", "prodi": "Teknologi Informasi", "position": "Staff" },
          { "id": 26, "name": "Muh Hidayat", "prodi": "Teknologi Informasi", "position": "Staff" },
          { "id": 27, "name": "Fauzan Annas H", "prodi": "Teknologi Informasi", "position": "Staff" },
          { "id": 28, "name": "Raini Girigayatri", "prodi": "Arsitektur", "position": "Staff" },
          { "id": 29, "name": "Adzkya Alfara Kaida", "prodi": "Arsitektur", "position": "Staff" }
        ]
      },
      {
        "id": 7,
        "cabinet_id": 1,
        "name": "Kasosma",
        "members": [
          { "id": 30, "name": "Yunan Al husaini Djaibakal", "prodi": "Teknologi Informasi", "position": "Kepala Departemen" },
          { "id": 31, "name": "Hanifah Fauziyah Haryana", "prodi": "Arsitektur", "position": "Sekretaris Departemen" },
          { "id": 32, "name": "Naufal Zaki Ammar Fadilla", "prodi": "Teknologi Informasi", "position": "Staff" },
          { "id": 33, "name": "Nurdiansyah Zamiludin", "prodi": "Arsitektur", "position": "Staff" },
          { "id": 34, "name": "Farhan Faraj Huda", "prodi": "Teknologi Informasi", "position": "Staff" }
        ]
      },
      {
        "id": 8,
        "cabinet_id": 1,
        "name": "KWU",
        "members": [
          { "id": 35, "name": "Afifi Rokhman", "prodi": "Arsitektur", "position": "Kepala Departemen" },
          { "id": 36, "name": "M. Ilham Wahyudi", "prodi": "Teknologi Informasi", "position": "Sekretaris Departemen" },
          { "id": 37, "name": "Ratih Oktavianingrum", "prodi": "Bioteknologi", "position": "Staff" },
          { "id": 38, "name": "Muhammad Rizal Hidayat", "prodi": "Arsitektur", "position": "Staff" },
          { "id": 39, "name": "Adhika yulianto setyawan", "prodi": "Arsitektur", "position": "Staff" }
        ]
      }
    ]
  },
  "latest_posts": [
    {
      "id": 3,
      "title": "Rekrutmen Volunteer BEM FST UNISA 2026",
      "slug": "rekrutmen-volunteer-bem-fst-unisa-2026",
      "content": "<p>BEM FST UNISA membuka rekrutmen volunteer untuk berbagai program kerja tahun 2026. Pendaftaran dibuka hingga 30 Januari 2026.</p>",
      "excerpt": "Rekrutmen volunteer BEM FST UNISA dibuka hingga 30 Januari 2026.",
      "featured_image": null,
      "category": "news",
      "status": "published",
      "published_at": "2026-02-07T15:24:25.000000Z",
      "created_at": "2026-02-09T15:24:25.000000Z",
      "views": 142
    },
    {
      "id": 2,
      "title": "BEM FST UNISA Gelar Seminar Kewirausahaan",
      "slug": "bem-fst-unisa-gelar-seminar-kewirausahaan",
      "content": "<p>BEM FST UNISA mengadakan seminar kewirausahaan dengan tema \"Membangun Bisnis di Era Digital\" pada 15 Januari 2026. Acara ini dihadiri oleh 200+ peserta dan menghadirkan pengusaha sukses sebagai pembicara.</p>",
      "excerpt": "Seminar kewirausahaan dengan tema Membangun Bisnis di Era Digital.",
      "featured_image": null,
      "category": "event",
      "status": "published",
      "published_at": "2026-02-04T15:24:25.000000Z",
      "created_at": "2026-02-09T15:24:25.000000Z",
      "views": 256
    },
    {
      "id": 1,
      "title": "Pelantikan Kabinet BEM FST UNISA 2025/2026",
      "slug": "pelantikan-kabinet-bem-fst-unisa-2025-2026",
      "content": "<p>Pelantikan Kabinet Kolaborasi BEM FST UNISA periode 2025/2026 telah dilaksanakan dengan sukses pada tanggal 1 Januari 2026. Acara dihadiri oleh Dekan FST, Dosen, dan seluruh mahasiswa.</p>",
      "excerpt": "Pelantikan Kabinet Kolaborasi BEM FST UNISA periode 2025/2026 telah dilaksanakan dengan sukses.",
      "featured_image": null,
      "category": "news",
      "status": "published",
      "published_at": "2026-01-30T15:24:25.000000Z",
      "created_at": "2026-02-09T15:24:25.000000Z",
      "views": 389
    }
  ]
};

// --- DATA PROCESSING & MAPPERS ---

// Helper: Generate Avatar
const getAvatar = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=512`;

// Helper: Parse Mission String to Array
const parseMission = (missionText: string): string[] => {
  if (!missionText) return [];
  // Split by number pattern like "1. ", "2. " or just newlines
  return missionText.split(/\d+\.\s+/).filter(item => item.trim().length > 0).map(i => i.trim());
};

// 1. Process Organization Data
const processedOrg: OrganizationProfile = {
  name: RAW_DATA.organization.name,
  description: RAW_DATA.organization.description,
  vision: RAW_DATA.active_cabinet.vision,
  mission: parseMission(RAW_DATA.active_cabinet.mission),
  email: RAW_DATA.organization.email,
  phone: RAW_DATA.organization.phone,
  address: RAW_DATA.organization.address,
  logo_url: getAvatar("BEM FST"), // Fallback as logo is null in JSON
  cabinet_name: RAW_DATA.active_cabinet.name,
  tagline: RAW_DATA.active_cabinet.tagline,
  period_years: `${RAW_DATA.active_period.year_start}/${RAW_DATA.active_period.year_end}`,
  socials: RAW_DATA.organization.social_media
};

// 2. Process Cabinet Data (Flattening Divisions)
const processedCabinet: CabinetMember[] = [];

RAW_DATA.active_cabinet.divisions.forEach(div => {
  div.members.forEach(m => {
    let dept = div.name;
    
    // Logic to separate "Inti" into "Pimpinan" (Gov/Wagub) and "BPH" (Sec/Treas)
    if (div.name === "Inti") {
      if (m.position.includes("Gubernur")) {
        dept = "Pimpinan";
      } else {
        dept = "BPH";
      }
    }

    processedCabinet.push({
      id: m.id,
      name: m.name,
      position: m.position,
      department: dept,
      photo_url: getAvatar(m.name),
      bio: m.prodi // Storing Prodi in Bio field
    });
  });
});

// 3. Process Posts
const processedPosts: Post[] = RAW_DATA.latest_posts.map((p, idx) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  content: p.content,
  category: p.category === 'news' ? 'Berita' : 'Event',
  // Fallback image logic since JSON returns null
  image_url: p.featured_image || `https://picsum.photos/800/600?random=${p.id + 10}`, 
  author: "Admin BEM",
  created_at: p.published_at,
  views: p.views || 0
}));


class ApiService {
  private async safeFetch<T>(endpoint: string, mockData: T): Promise<T> {
    try {
      // Allow for simulated delay to show skeletons
      await delay(MOCK_DELAY);
      return mockData;
    } catch (error) {
      console.warn(`[API] Error fetching ${endpoint}`);
      return mockData;
    }
  }

  async getOrganization(): Promise<OrganizationProfile> {
    return this.safeFetch('/organization', processedOrg);
  }

  async getPosts(page = 1, perPage = 6): Promise<PaginatedResponse<Post>> {
    // Basic Pagination Logic on Memory Data
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedItems = processedPosts.slice(start, end);
    
    const response: PaginatedResponse<Post> = {
      data: paginatedItems,
      meta: {
        current_page: page,
        last_page: Math.ceil(processedPosts.length / perPage),
        per_page: perPage,
        total: processedPosts.length
      }
    };

    return this.safeFetch(`/posts?page=${page}&per_page=${perPage}`, response);
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const found = processedPosts.find(p => p.slug === slug) || processedPosts[0];
    return this.safeFetch(`/posts/${slug}`, found);
  }

  async getCabinet(): Promise<CabinetMember[]> {
    return this.safeFetch('/cabinets/active', processedCabinet);
  }
}

export const api = new ApiService();