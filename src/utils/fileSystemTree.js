export const tree = {
  "boot": {
    "config": nothing,
    "efi": {
      "EFI": {
        "BOOT": {
          "BOOTX64.EFI": nothing,
          "fbx64.efi": nothing,
          "mmx64.efi": nothing,
        },
        "chriskimOS": {
          "BOOTX64.CSV": nothing,
          "grub.cfg": nothing,
          "grubx64.efi": nothing,
          "mmx64.efi": nothing,
          "shimx64.efi": nothing,
        }
      }
    },
    "grub": {
      "fonts": {
        "unicode.pf2": nothing,
      },
      "grub.cfg": nothing,
      "grubenv": nothing,
      "i386-pc": {
        "normal.mod": nothing,
      },
      "locale": {
        "en.mo": nothing,
      },
      "x86_64-efi": {
        "normal.mod": nothing,
      }
    },
    "initrd.img": nothing,
    "vmlinuz": nothing,
  },
  "dev": {
    "cpu": {
      "0": { "msr": nothing }, "1": { "msr": nothing }, "2": { "msr": nothing }, "3": { "msr": nothing },
      "4": { "msr": nothing }, "5": { "msr": nothing }, "6": { "msr": nothing }, "7": { "msr": nothing },
      "8": { "msr": nothing }, "9": { "msr": nothing }, "10": { "msr": nothing }, "11": { "msr": nothing },
      "12": { "msr": nothing }, "13": { "msr": nothing }, "14": { "msr": nothing }, "15": { "msr": nothing },
    },
    "disk": {
      "by-id": {
        "ata-QEMU_HARDDISK_QM00001": nothing,
        "ata-QEMU_HARDDISK_QM00001-part1": nothing,
        "ata-QEMU_HARDDISK_QM00001-part2": nothing,
        "ata-QEMU_HARDDISK_QM00001-part3": nothing,
      },
      "by-partuuid": {
        "4fcb06da-29c9-4b28-b8b0-e35c9e07abe5": nothing,
        "7ba2bd7b-c746-4851-a5f5-42bc393930d6": nothing,
        "511eceff-a7b6-46e9-b7b9-d29dbd9ff204": nothing
      },
      "by-path": {
        "pci-0000:00:01.1-ata-1": nothing,
        "pci-0000:00:01.1-ata-1-part1": nothing,
        "pci-0000:00:01.1-ata-1-part2": nothing,
        "pci-0000:00:01.1-ata-1-part3": nothing,
      },
      "by-uuid": {
        "4a26edeb-942a-4c09-bd9d-ab64b13ec54d": nothing,
      }
    },
    "dma_heap": {
      "system": nothing,
    },
    "dri": {
      "card0": nothing,
      "renderD128": nothing,
    },
    "fd": {
      "0": nothing, "1": nothing, "2": nothing, "3": nothing
    },
    "full": nothing,
    "fuse": nothing,
    "initctl": nothing,
    "loop0": nothing, "loop1": nothing, "loop2": nothing, "loop3": nothing, "loop4": nothing, "loop5": nothing, "loop6": nothing, "loop7": nothing, "loop-control": nothing,
    "mapper": {
      "control": nothing,
    },
    "mem": nothing,
    "mqueue": {},
    "net": {
      "dev": {
        "lo": nothing,
      },
      "tun": nothing,
    },
    "null": nothing,
    "port": nothing,
    "ptmx": nothing,
    "random": nothing,
    "rtc": nothing,
    "stderr": nothing,
    "stdin": nothing,
    "stdout": nothing,
    "tty": nothing, "tty0": nothing, "tty1": nothing, "tty2": nothing, "tty3": nothing, "tty4": nothing, "tty5": nothing, "tty6": nothing, "tty7": nothing, "ttyprintk": nothing, "ttyS0": nothing, "ttyS1": nothing, "ttyS2": nothing, "ttyS3": nothing, "ttyS4": nothing, "ttyS5": nothing, "ttyS6": nothing, "ttyS7": nothing,
    "urandom": nothing,
    "vcs": nothing, "vcs0": nothing, "vcs1": nothing, "vcs2": nothing, "vcs3": nothing, "vcs4": nothing, "vcs5": nothing, "vcs6": nothing,
    "vcsa": nothing, "vcsa0": nothing, "vcsa1": nothing, "vcsa2": nothing, "vcsa3": nothing, "vcsa4": nothing, "vcsa5": nothing, "vcsa6": nothing,
    "vcsu": nothing, "vcsu0": nothing, "vcsu1": nothing, "vcsu2": nothing, "vcsu3": nothing, "vcsu4": nothing, "vcsu5": nothing, "vcsu6": nothing,
    "vfio": { "vfio": nothing },
    "vga_arbiter": nothing,
    "vhci": nothing,
    "vhost-net": nothing,
    "zero": nothing,
    "zfs": nothing,
  },
  "etc": {},
  "home": {
    "chriskim": {
      "readme.txt": readme
    }
  },
  "media": {},
  "mnt": {},
  "opt": {},
  "proc": {
    "cpuinfo": cpuinfo,
    "meminfo": meminfo,
    "uptime": uptime,
  },
  "root": {},
  "run": {},
  "srv": {},
  "sys": {
    "block": {}, "bus": {}, "class": {}, "dev": {}, "devices": {}, "firmware": {}, "fs": {}, "hypervisor": {}, "kernel": {}, "module": {}, "power": {},
  },
  "tmp": {},
  "usr": {
    "bin": {}, "include": {}, "lib": {}, "lib32": {}, "lib64": {}, "libexec": {}, "libx32": {}, "local": {}, "sbin": {}, "share": {}, "src": {},
  },
  "var": {
    "backups": {}, "cache": {}, "crash": {}, "lib": {}, "local": {}, "lock": {}, "log": {}, "mail": {}, "opt": {}, "run": {}, "snap": {}, "spool": {}, "tmp": {},
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

function nothing() {
  return "The quick brown fox jumps over the lazy dog.";
}