from algopy import ARC4Contract, BoxMap,BoxRef, String, log, Txn, Global, TemplateVar, UInt64, itxn
from algopy.arc4 import abimethod, baremethod

# This contract is a simple key-value store that allows you to set and get values


class Lodash(ARC4Contract):
    """Object Storage on Algorand

    Attributes
    ----------
    public : BoxMap
        Boxes that store the object
    """
    def __init__(self) -> None:
        self.public = BoxMap(String, String, key_prefix=b"orm_")

    @baremethod(allow_actions=["UpdateApplication"])
    def on_update(self) -> None:
        assert Txn.sender == Global.creator_address
        assert TemplateVar[bool]("UPDATABLE")

    @baremethod(allow_actions=["DeleteApplication"])
    def on_delete(self) -> None:
        assert Txn.sender == Global.creator_address
        assert TemplateVar[UInt64]("DELETABLE")

    @abimethod()
    def set(self, path: String, value: String) -> None:
        assert Txn.sender == Global.creator_address
        log(b"Setting {path} to {value}")
        self.public[path] = value

    @abimethod()
    def get(self, path: String) -> String:
        assert Txn.sender == Global.creator_address
        log(b"Getting {path} to {value}")
        assert path in self.public
        return self.public[path]

    @abimethod()
    def remove(self, path: String) -> None:
        assert Txn.sender == Global.creator_address
        log(b"Removing {path}")
        assert path in self.public
        ref = BoxRef(key=path)
        assert ref.delete()

    @abimethod()
    def concat(self, path: String, value: String) -> None:
        """Concatenates a value to an existing box."""
        assert Txn.sender == Global.creator_address
        log(b"Adding {value} to {path}")
        assert path in self.public
        self.public[path] = self.public[path] + value

    @abimethod()
    def reclaim(self, amount: UInt64) -> None:
        assert Txn.sender == Global.creator_address
        log(b"Reclaiming MBR")
        itxn.Payment(sender=Global.current_application_address, receiver=Global.creator_address, amount=amount, fee=0).submit()
