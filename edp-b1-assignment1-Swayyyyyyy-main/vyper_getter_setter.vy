# @version ^0.3.3
stored_value: public(int128)

@external
def set_value(new_value: int128):
     self.stored_value = new_value
@external
@view
def get_value() -> int128:
     return self.stored_value
