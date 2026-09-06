export function readme() {
  return [
    "#############################",
    "# Welcome to shell-emulator #",
    "#############################",
    "",
    "It's a simple shell emulator made with Vue.js.",
    "Author: <a href=\"https://github.com/ChrisKimZHT\" target=\"_blank\">ChrisKimZHT</a> | GitHub: <a href=\"https://github.com/ChrisKimZHT/shell-emulator\" target=\"_blank\">shell-emulator</a>",
    "",
  ].join("\n");
}

//////////////////////////////////////////////////////////////////////

export function cpuinfo() {
  const performanceCoreCount = 6;
  const efficiencyCoreCount = 8;
  const physicalCoreCount = performanceCoreCount + efficiencyCoreCount;
  const logicalProcessorCount = performanceCoreCount * 2 + efficiencyCoreCount;
  const result = [];

  for (let i = 0; i < logicalProcessorCount; i++) {
    // List every physical core once, followed by the P-cores' sibling threads.
    const coreId = i < physicalCoreCount ? i : i - physicalCoreCount;
    const isEfficiencyCore = coreId >= performanceCoreCount;

    result.push([
      `processor       : ${i}`,
      `vendor_id       : GenuineIntel`,
      `cpu family      : 6`,
      `model           : 183`,
      `model name      : 13th Gen Intel(R) Core(TM) i5-13600KF`,
      `stepping        : 1`,
      `microcode       : 0xffffffff`,
      `cpu MHz         : ${isEfficiencyCore ? "2593.906" : "3494.399"}`,
      `cache size      : 24576 KB`,
      `physical id     : 0`,
      `siblings        : ${logicalProcessorCount}`,
      `core id         : ${coreId}`,
      `cpu cores       : ${physicalCoreCount}`,
      `apicid          : ${i}`,
      `initial apicid  : ${i}`,
      `fpu             : yes`,
      `fpu_exception   : yes`,
      `cpuid level     : 28`,
      `wp              : yes`,
      `flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology tsc_reliable nonstop_tsc cpuid tsc_known_freq pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch ssbd ibrs ibpb stibp ibrs_enhanced tpr_shadow ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid rdseed adx smap clflushopt clwb sha_ni xsaveopt xsavec xgetbv1 xsaves avx_vnni vnmi umip waitpkg gfni vaes vpclmulqdq rdpid movdiri movdir64b fsrm md_clear serialize ibt flush_l1d arch_capabilities`,
      `bugs            : spectre_v1 spectre_v2 spec_store_bypass swapgs retbleed eibrs_pbrsb bhi spectre_v2_user its`,
      `bogomips        : 6988.79`,
      `clflush size    : 64`,
      `cache_alignment : 64`,
      `address sizes   : 39 bits physical, 48 bits virtual`,
      `power management:\n`,
    ].join("\n"));
  }
  return result.join("\n");
}

export function meminfo() {
  return [
    "MemTotal:       32864924 kB",
    "MemFree:        30486512 kB",
    "MemAvailable:   31705984 kB",
    "Buffers:           88740 kB",
    "Cached:          1416484 kB",
    "SwapCached:            0 kB",
    "Active:           195416 kB",
    "Inactive:        1487492 kB",
    "Active(anon):       3544 kB",
    "Inactive(anon):   178292 kB",
    "Active(file):     191872 kB",
    "Inactive(file):  1309200 kB",
    "Unevictable:           0 kB",
    "Mlocked:               0 kB",
    "SwapTotal:      16777216 kB",
    "SwapFree:       16777216 kB",
    "Dirty:                84 kB",
    "Writeback:             0 kB",
    "AnonPages:        177864 kB",
    "Mapped:           212420 kB",
    "Shmem:              4100 kB",
    "KReclaimable:      39908 kB",
    "Slab:             179136 kB",
    "SReclaimable:      39908 kB",
    "SUnreclaim:       139228 kB",
    "KernelStack:        6752 kB",
    "PageTables:         7812 kB",
    "SecPageTables:         0 kB",
    "NFS_Unstable:          0 kB",
    "Bounce:                0 kB",
    "WritebackTmp:          0 kB",
    "CommitLimit:    33209676 kB",
    "Committed_AS:    1375616 kB",
    "VmallocTotal:   34359738367 kB",
    "VmallocUsed:      148164 kB",
    "VmallocChunk:          0 kB",
    "Percpu:            11328 kB",
    "HardwareCorrupted:     0 kB",
    "AnonHugePages:         0 kB",
    "ShmemHugePages:        0 kB",
    "ShmemPmdMapped:        0 kB",
    "FileHugePages:         0 kB",
    "FilePmdMapped:         0 kB",
    "Unaccepted:            0 kB",
    "Balloon:               0 kB",
    "HugePages_Total:       0",
    "HugePages_Free:        0",
    "HugePages_Rsvd:        0",
    "HugePages_Surp:        0",
    "Hugepagesize:       2048 kB",
    "Hugetlb:               0 kB",
    "DirectMap4k:       76800 kB",
    "DirectMap2M:    10407936 kB",
    "DirectMap1G:    32505856 kB",
  ].join("\n");
}

export function uptime() {
  const uptime = localStorage.getItem('uptime');
  const now = Date.now();
  const diff = now - uptime;
  const seconds = (diff / 1000).toFixed(2);
  return seconds;
}

export function nothing() {
  return "The quick brown fox jumps over the lazy dog.";
}
