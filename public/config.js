window.Config = {
  shell: {
    user: "user",
    host: "shell-emulator",
    welcome: `Welcome to the Shell Emulator!\n\n`
  },
}

window.Directory = {
  type: "dir",
  sub: {
    "bin": {
      type: "dir",
    },
    "boot": {
      type: "dir",
    },
    "dev": {
      type: "dir",
    },
    "etc": {
      type: "dir",
    },
    "home": {
      type: "dir",
      sub: {
        "user": {
          type: "dir",
        }
      }
    },
    "lib": {
      type: "dir",
    },
    "media": {
      type: "dir",
    },
    "mnt": {
      type: "dir",
    },
    "opt": {
      type: "dir",
    },
    "proc": {
      type: "dir",
    },
    "root": {
      type: "dir",
    },
    "run": {
      type: "dir",
    },
    "sbin": {
      type: "dir",
    },
    "srv": {
      type: "dir",
    },
    "sys": {
      type: "dir",
    },
    "tmp": {
      type: "dir",
    },
    "usr": {
      type: "dir",
    },
    "var": {
      type: "dir",
    }
  }
}

window.Commands = [
  {
    name: "",
    func: (cwd, args) => {
      return "<<< EMPTY >>>";
    }
  },
  {
    name: "cd",
    func: (cwd, args) => {
      if (args.length == 0) {
        return `<<< CD:~ >>>`;
      }
      if (args.length > 1) {
        return "cd: too many arguments";
      }
      const paths = args[0].split("/").filter((path) => path !== "");
      const cwds = cwd.split("/").filter((path) => path !== "");
      let resultPaths = [];
      if (paths[0] === "..") {
        resultPaths = cwds;
        resultPaths.pop();
        resultPaths = resultPaths.concat(paths.slice(1));
      } else if (paths[0] === "~") {
        resultPaths = ["home", Config.shell.user].concat(paths.slice(1));
      } else if (paths[0] === "." || !args[0].startsWith("/")) {
        resultPaths = cwds.concat(paths);
      } else {
        resultPaths = paths;
      }
      let current = Directory;
      let exists = true;
      for (const path of resultPaths) {
        if (current.sub === undefined || current.sub[path] === undefined) {
          exists = false;
          break;
        }
        current = current.sub[path];
      }
      if (!exists) {
        return `cd: ${args[0]}: no such file or directory`;
      }
      return `<<< CD:${"/" + resultPaths.join("/")} >>>`;
    }
  },
  {
    name: "clear",
    func: (cwd, args) => {
      if (args.length > 0) {
        return "clear: too many arguments";
      }
      return "<<< CLEAR >>>";
    }
  },
  {
    name: "echo",
    func: (cwd, args) => {
      return args.join(" ");
    }
  },
  {
    name: "pwd",
    func: (cwd, args) => {
      if (args.length > 0) {
        return "pwd: too many arguments";
      }
      return cwd;
    }
  },
  {
    name: "whoami",
    func: (cwd, args) => {
      if (args.length > 0) {
        return "whoami: too many arguments";
      }
      return Config.shell.user;
    }
  }
]

