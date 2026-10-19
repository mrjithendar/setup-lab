#!/usr/bin/env bash
# Pure platform selection, also used by regression tests.
select_platform() {
  local id=$1 version=$2 major=${2%%.*}
  case "$id:$version" in
    amzn:2023) echo amazon;;
    ubuntu:22.04|ubuntu:24.04|ubuntu:26.04|debian:12|debian:13) echo apt;;
    centos:9|centos:10) echo rpm;;
    rocky:*|almalinux:*|rhel:*)
      case "$major" in 9|10) echo rpm;; *) return 1;; esac;;
    fedora:*) echo rpm;;
    *) return 1;;
  esac
}
