export const tree = {
  "boot": {

  },
  "dev": {

  },
  "etc": {

  },
  "home": {
    "chriskim": {
      "readme.txt": readme
    }
  },
  "media": {

  },
  "mnt": {

  },
  "opt": {

  },
  "proc": {
    "cpuinfo": cpuinfo,
    "meminfo": meminfo,
    "uptime": uptime,
  },
  "root": {

  },
  "run": {

  },
  "srv": {

  },
  "sys": {

  },
  "tmp": {

  },
  "usr": {

  },
  "var": {

  }
};

function cpuinfo() {
  let result = [];
  for (let i = 0; i < 16; i++) {
    result.push([
      `processor       : ${i}`,
      `vendor_id       : GenuineIntel`,
      `cpu family      : 6`,
      `model           : 191`,
      `model name      : 13th Gen Intel(R) Core(TM) i5-13490F`,
      `stepping        : 2`,
      `microcode       : 0xffffffff`,
      `cpu MHz         : 2495.999`,
      `cache size      : 24576 KB`,
      `physical id     : 0`,
      `siblings        : 16`,
      `core id         : 0`,
      `cpu cores       : 8`,
      `apicid          : 0`,
      `initial apicid  : 0`,
      `fpu             : yes`,
      `fpu_exception   : yes`,
      `cpuid level     : 21`,
      `wp              : yes`,
      `flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology tsc_reliable nonstop_tsc cpuid pni pclmulqdq ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase bmi1 avx2 smep bmi2 erms invpcid rdseed adx smap clflushopt clwb sha_ni xsaveopt xsavec xgetbv1 xsaves umip gfni vaes vpclmulqdq rdpid fsrm flush_l1d arch_capabilities`,
      `bugs            : spectre_v1 spectre_v2 spec_store_bypass swapgs mmio_unknown retbleed eibrs_pbrsb`,
      `bogomips        : 4991.99`,
      `clflush size    : 64`,
      `cache_alignment : 64`,
      `address sizes   : 39 bits physical, 48 bits virtual`,
      `power management:\n`,
    ].join("\n"))
  }
  return result.join("\n");
}

function meminfo() {
  return [
    "MemTotal:       24613188 kB",
    "MemFree:        23579124 kB",
    "MemAvailable:   23747196 kB",
    "Buffers:           35352 kB",
    "Cached:           421840 kB",
    "SwapCached:            0 kB",
    "Active:           124504 kB",
    "Inactive:         530752 kB",
    "Active(anon):       2824 kB",
    "Inactive(anon):   198544 kB",
    "Active(file):     121680 kB",
    "Inactive(file):   332208 kB",
    "Unevictable:           0 kB",
    "Mlocked:               0 kB",
    "SwapTotal:       8388608 kB",
    "SwapFree:        8388608 kB",
    "Dirty:                 0 kB",
    "Writeback:             0 kB",
    "AnonPages:        194848 kB",
    "Mapped:           163404 kB",
    "Shmem:              3304 kB",
    "KReclaimable:      35856 kB",
    "Slab:              97464 kB",
    "SReclaimable:      35856 kB",
    "SUnreclaim:        61608 kB",
    "KernelStack:        4688 kB",
    "PageTables:         4744 kB",
    "NFS_Unstable:          0 kB",
    "Bounce:                0 kB",
    "WritebackTmp:          0 kB",
    "CommitLimit:    20695200 kB",
    "Committed_AS:     931036 kB",
    "VmallocTotal:   34359738367 kB",
    "VmallocUsed:       27572 kB",
    "VmallocChunk:          0 kB",
    "Percpu:             7040 kB",
    "AnonHugePages:     73728 kB",
    "ShmemHugePages:        0 kB",
    "ShmemPmdMapped:        0 kB",
    "FileHugePages:         0 kB",
    "FilePmdMapped:         0 kB",
    "HugePages_Total:       0",
    "HugePages_Free:        0",
    "HugePages_Rsvd:        0",
    "HugePages_Surp:        0",
    "Hugepagesize:       2048 kB",
    "Hugetlb:               0 kB",
    "DirectMap4k:       82944 kB",
    "DirectMap2M:     7256064 kB",
    "DirectMap1G:    27262976 kB",
  ].join("\n");
}

function uptime() {
  const uptime = localStorage.getItem('uptime');
  const now = Date.now();
  const diff = now - uptime;
  const seconds = (diff / 1000).toFixed(2);
  return seconds;
}

function readme() {
  return [
    "##############################",
    "# Welcome to ChrisKim shell! #",
    "##############################",
    "",
    "It's a simple shell emulator made with Vue.js and Node.js.",
    "You can explore and play with it.",
  ].join("\n");
}
