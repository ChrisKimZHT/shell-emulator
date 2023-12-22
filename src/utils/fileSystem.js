export function getFileContent(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return null;
    }
    current = current[dir];
  }
  if (typeof current !== "string") {
    return null;
  }
  return current;
}

export function checkDirectory(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return false;
    }
    current = current[dir];
  }
  if (typeof current === "string") {
    return false;
  }
  return true;
}

export function listDirectory(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return null;
    }
    current = current[dir];
  }
  if (typeof current === "string") {
    return null;
  }
  return Object.keys(current);
}

export function checkFile(path) {
  const pathSplit = path.split("/").map(x => x.trim()).filter(x => x.length > 0);
  let current = tree;
  for (const dir of pathSplit) {
    if (current[dir] === undefined) {
      return false;
    }
    current = current[dir];
  }
  if (typeof current !== "string") {
    return false;
  }
  return true;
}

const tree = {
  "boot": {
    
  },
  "dev": {

  },
  "etc": {

  },
  "home": {
    "chriskim": {
      "readme.txt": "##############################\n# Welcome to ChrisKim shell! #\n##############################\n\nIt's a simple shell emulator made with Vue.js and Node.js.\nYou can explore and play with it.\n"
    }
  },
  "media": {

  },
  "mnt": {

  },
  "opt": {

  },
  "proc": {
    "cpuinfo": "[FUNCTION]() => { let result = ''; for (let i = 0; i < 16; i++) { result += `processor       : ${i}\nvendor_id       : GenuineIntel\ncpu family      : 6\nmodel           : 191\nmodel name      : 13th Gen Intel(R) Core(TM) i5-13490F\nstepping        : 2\nmicrocode       : 0xffffffff\ncpu MHz         : 2495.999\ncache size      : 24576 KB\nphysical id     : 0\nsiblings        : 16\ncore id         : 0\ncpu cores       : 8\napicid          : 0\ninitial apicid  : 0\nfpu             : yes\nfpu_exception   : yes\ncpuid level     : 21\nwp              : yes\nflags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl\nxtopology tsc_reliable nonstop_tsc cpuid pni pclmulqdq ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch ssbd ibrs ibpb\nstibp ibrs_enhanced fsgsbase bmi1 avx2 smep bmi2 erms invpcid rdseed adx smap clflushopt clwb sha_ni xsaveopt xsavec xgetbv1 xsaves umip gfni vaes vpclmulqdq rdpid fsrm\nflush_l1d arch_capabilities\nbugs            : spectre_v1 spectre_v2 spec_store_bypass swapgs mmio_unknown retbleed eibrs_pbrsb\nbogomips        : 4991.99\nclflush size    : 64\ncache_alignment : 64\naddress sizes   : 39 bits physical, 48 bits virtual\npower management:\n\n` } return result; }",
    "meminfo": "MemTotal:       24613188 kB\nMemFree:        23579124 kB\nMemAvailable:   23747196 kB\nBuffers:           35352 kB\nCached:           421840 kB\nSwapCached:            0 kB\nActive:           124504 kB\nInactive:         530752 kB\nActive(anon):       2824 kB\nInactive(anon):   198544 kB\nActive(file):     121680 kB\nInactive(file):   332208 kB\nUnevictable:           0 kB\nMlocked:               0 kB\nSwapTotal:       8388608 kB\nSwapFree:        8388608 kB\nDirty:                 0 kB\nWriteback:             0 kB\nAnonPages:        194848 kB\nMapped:           163404 kB\nShmem:              3304 kB\nKReclaimable:      35856 kB\nSlab:              97464 kB\nSReclaimable:      35856 kB\nSUnreclaim:        61608 kB\nKernelStack:        4688 kB\nPageTables:         4744 kB\nNFS_Unstable:          0 kB\nBounce:                0 kB\nWritebackTmp:          0 kB\nCommitLimit:    20695200 kB\nCommitted_AS:     931036 kB\nVmallocTotal:   34359738367 kB\nVmallocUsed:       27572 kB\nVmallocChunk:          0 kB\nPercpu:             7040 kB\nAnonHugePages:     73728 kB\nShmemHugePages:        0 kB\nShmemPmdMapped:        0 kB\nFileHugePages:         0 kB\nFilePmdMapped:         0 kB\nHugePages_Total:       0\nHugePages_Free:        0\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:       2048 kB\nHugetlb:               0 kB\nDirectMap4k:       82944 kB\nDirectMap2M:     7256064 kB\nDirectMap1G:    27262976 kB",
    "uptime": "[FUNCTION]() => { const uptime = localStorage.getItem('uptime'); const now = Date.now(); const diff = now - uptime; const seconds = (diff / 1000).toFixed(2); return seconds; }",
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