import { cpuinfo, meminfo, nothing, readme, uptime } from './fsFile.js';

window.fsTree = {
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
    "defaultuser": {
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