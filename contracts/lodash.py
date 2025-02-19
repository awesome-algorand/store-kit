from algopy import ARC4Contract, BoxMap, String, Bytes, log, arc4
from algopy.arc4 import abimethod


class Lodash(ARC4Contract):
    def __init__(self) -> None:
        self.public = BoxMap(String, String, key_prefix=b"orm_")

    @abimethod()
    def set(self, path: String, value: String) -> None:
        log(b"Setting {path} to {value}")
        self.public[path] = value

    @abimethod()
    def get(self, path: String) -> String:
        log(b"Getting {path} to {value}")
        assert path in self.public
        return self.public[path]
