import { getArc56ReturnValue } from '@algorandfoundation/algokit-utils/types/app-arc56';
import { AppClient as _AppClient, } from '@algorandfoundation/algokit-utils/types/app-client';
import { AppFactory as _AppFactory } from '@algorandfoundation/algokit-utils/types/app-factory';
export const APP_SPEC = { "arcs": [], "name": "Lodash", "desc": "Object Storage on Algorand\n\n    Attributes\n    ----------\n    public : BoxMap\n        Boxes that store the object\n    ", "structs": {}, "methods": [{ "name": "assign", "args": [{ "name": "value", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "set", "args": [{ "name": "path", "type": "string" }, { "name": "value", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "get", "args": [{ "name": "path", "type": "string" }], "returns": { "type": "string" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "remove", "args": [{ "name": "path", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "concat", "desc": "Concatenates a value to an existing box.", "args": [{ "name": "path", "type": "string" }, { "name": "value", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "reclaim", "args": [{ "name": "amount", "type": "uint64" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }], "state": { "schema": { "global": { "ints": 1, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "counter": { "key": "Y291bnQ=", "keyType": "AVMString", "valueType": "AVMUint64", "desc": "Number of mutations" }, "type": { "key": "dHlwZQ==", "keyType": "AVMString", "valueType": "AVMBytes" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5fX2FsZ29weV9lbnRyeXBvaW50X3dpdGhfaW5pdCgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAxIDAgVE1QTF9ERUxFVEFCTEUKICAgIGJ5dGVjYmxvY2sgImNvdW50IiAweDZmNzI2ZDVmCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjE3CiAgICAvLyBzZWxmLmNvdW50ZXIgPSBHbG9iYWxTdGF0ZShVSW50NjQoMCksIGtleT0iY291bnQiLCBkZXNjcmlwdGlvbj0iTnVtYmVyIG9mIG11dGF0aW9ucyIpCiAgICBieXRlY18wIC8vICJjb3VudCIKICAgIGludGNfMSAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjgKICAgIC8vIGNsYXNzIExvZGFzaChBUkM0Q29udHJhY3QpOgogICAgdHhuIE51bUFwcEFyZ3MKICAgIGJ6IG1haW5fYmFyZV9yb3V0aW5nQDExCiAgICBwdXNoYnl0ZXNzIDB4ZjI3NDUyYjIgMHhhODYxN2NjZCAweGMwODUwYWVlIDB4OGU4OTAwYjkgMHg1MzAxM2JkYiAweDRlZmY1MTZkIC8vIG1ldGhvZCAiYXNzaWduKHN0cmluZyl2b2lkIiwgbWV0aG9kICJzZXQoc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJnZXQoc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAicmVtb3ZlKHN0cmluZyl2b2lkIiwgbWV0aG9kICJjb25jYXQoc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJyZWNsYWltKHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9hc3NpZ25fcm91dGVANSBtYWluX3NldF9yb3V0ZUA2IG1haW5fZ2V0X3JvdXRlQDcgbWFpbl9yZW1vdmVfcm91dGVAOCBtYWluX2NvbmNhdF9yb3V0ZUA5IG1haW5fcmVjbGFpbV9yb3V0ZUAxMAoKbWFpbl9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo4CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIGludGNfMSAvLyAwCiAgICByZXR1cm4KCm1haW5fcmVjbGFpbV9yb3V0ZUAxMDoKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NjMKICAgIC8vIEBhYmltZXRob2QoKQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjgKICAgIC8vIGNsYXNzIExvZGFzaChBUkM0Q29udHJhY3QpOgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgYnRvaQogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo2MwogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBjYWxsc3ViIHJlY2xhaW0KICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCm1haW5fY29uY2F0X3JvdXRlQDk6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjU1CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgbm90IE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo4CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBleHRyYWN0IDIgMAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo1NQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBjYWxsc3ViIGNvbmNhdAogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKbWFpbl9yZW1vdmVfcm91dGVAODoKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NDcKICAgIC8vIEBhYmltZXRob2QoKQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjgKICAgIC8vIGNsYXNzIExvZGFzaChBUkM0Q29udHJhY3QpOgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZXh0cmFjdCAyIDAKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NDcKICAgIC8vIEBhYmltZXRob2QoKQogICAgY2FsbHN1YiByZW1vdmUKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCm1haW5fZ2V0X3JvdXRlQDc6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjQwCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgbm90IE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo4CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGV4dHJhY3QgMiAwCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjQwCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgZ2V0CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgptYWluX3NldF9yb3V0ZUA2OgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozMwogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6OAogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZXh0cmFjdCAyIDAKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MzMKICAgIC8vIEBhYmltZXRob2QoKQogICAgY2FsbHN1YiBzZXQKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCm1haW5fYXNzaWduX3JvdXRlQDU6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjI2CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgbm90IE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo4CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGV4dHJhY3QgMiAwCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjI2CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgYXNzaWduCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgptYWluX2JhcmVfcm91dGluZ0AxMToKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6OAogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICBwdXNoaW50IDUgLy8gNQogICAgaW50Y18xIC8vIDAKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIG1hdGNoIG1haW5fb25fZGVsZXRlQDEyIG1haW5fX19hbGdvcHlfZGVmYXVsdF9jcmVhdGVAMTMKICAgIGIgbWFpbl9hZnRlcl9pZl9lbHNlQDE0CgptYWluX19fYWxnb3B5X2RlZmF1bHRfY3JlYXRlQDEzOgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICEKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gY3JlYXRpbmcKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCm1haW5fb25fZGVsZXRlQDEyOgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weToyMQogICAgLy8gQGJhcmVtZXRob2QoYWxsb3dfYWN0aW9ucz1bIkRlbGV0ZUFwcGxpY2F0aW9uIl0pCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIGNhbGxzdWIgb25fZGVsZXRlCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gY29udHJhY3RzLmxvZGFzaC5Mb2Rhc2gub25fZGVsZXRlKCkgLT4gdm9pZDoKb25fZGVsZXRlOgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weToyMwogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgPT0gR2xvYmFsLmNyZWF0b3JfYWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjI0CiAgICAvLyBhc3NlcnQgVGVtcGxhdGVWYXJbVUludDY0XSgiREVMRVRBQkxFIikKICAgIGludGNfMiAvLyBUTVBMX0RFTEVUQUJMRQogICAgYXNzZXJ0CiAgICByZXRzdWIKCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5hc3NpZ24odmFsdWU6IGJ5dGVzKSAtPiB2b2lkOgphc3NpZ246CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjI2LTI3CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIC8vIGRlZiBhc3NpZ24oc2VsZiwgdmFsdWU6IFN0cmluZykgLT4gTm9uZToKICAgIHByb3RvIDEgMAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weToyOAogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgPT0gR2xvYmFsLmNyZWF0b3JfYWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjI5CiAgICAvLyBsb2coYiJTZXR0aW5nIHR5cGUgdG8ge3ZhbHVlfSIpCiAgICBwdXNoYnl0ZXMgMHg1MzY1NzQ3NDY5NmU2NzIwNzQ3OTcwNjUyMDc0NmYyMDdiNzY2MTZjNzU2NTdkCiAgICBsb2cKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MzAKICAgIC8vIHNlbGYudHlwZS52YWx1ZSA9IHZhbHVlCiAgICBwdXNoYnl0ZXMgInR5cGUiCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjMxCiAgICAvLyBzZWxmLmNvdW50ZXIudmFsdWUgPSBzZWxmLmNvdW50ZXIudmFsdWUgKyAxCiAgICBpbnRjXzEgLy8gMAogICAgYnl0ZWNfMCAvLyAiY291bnQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuY291bnRlciBleGlzdHMKICAgIGludGNfMCAvLyAxCiAgICArCiAgICBieXRlY18wIC8vICJjb3VudCIKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5zZXQocGF0aDogYnl0ZXMsIHZhbHVlOiBieXRlcykgLT4gdm9pZDoKc2V0OgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozMy0zNAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICAvLyBkZWYgc2V0KHNlbGYsIHBhdGg6IFN0cmluZywgdmFsdWU6IFN0cmluZykgLT4gTm9uZToKICAgIHByb3RvIDIgMAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozNQogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgPT0gR2xvYmFsLmNyZWF0b3JfYWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjM2CiAgICAvLyBsb2coYiJTZXR0aW5nIHtwYXRofSB0byB7dmFsdWV9IikKICAgIHB1c2hieXRlcyAweDUzNjU3NDc0Njk2ZTY3MjA3YjcwNjE3NDY4N2QyMDc0NmYyMDdiNzY2MTZjNzU2NTdkCiAgICBsb2cKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MzcKICAgIC8vIHNlbGYucHVibGljW3BhdGhdID0gdmFsdWUKICAgIGJ5dGVjXzEgLy8gMHg2ZjcyNmQ1ZgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBmcmFtZV9kaWcgLTEKICAgIGJveF9wdXQKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MzgKICAgIC8vIHNlbGYuY291bnRlci52YWx1ZSA9IHNlbGYuY291bnRlci52YWx1ZSArIDEKICAgIGludGNfMSAvLyAwCiAgICBieXRlY18wIC8vICJjb3VudCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5jb3VudGVyIGV4aXN0cwogICAgaW50Y18wIC8vIDEKICAgICsKICAgIGJ5dGVjXzAgLy8gImNvdW50IgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIGNvbnRyYWN0cy5sb2Rhc2guTG9kYXNoLmdldChwYXRoOiBieXRlcykgLT4gYnl0ZXM6CmdldDoKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NDAtNDEKICAgIC8vIEBhYmltZXRob2QoKQogICAgLy8gZGVmIGdldChzZWxmLCBwYXRoOiBTdHJpbmcpIC0+IFN0cmluZzoKICAgIHByb3RvIDEgMQogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo0MgogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgPT0gR2xvYmFsLmNyZWF0b3JfYWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjQzCiAgICAvLyBsb2coYiJHZXR0aW5nIHtwYXRofSB0byB7dmFsdWV9IikKICAgIHB1c2hieXRlcyAweDQ3NjU3NDc0Njk2ZTY3MjA3YjcwNjE3NDY4N2QyMDc0NmYyMDdiNzY2MTZjNzU2NTdkCiAgICBsb2cKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NDQKICAgIC8vIGFzc2VydCBwYXRoIGluIHNlbGYucHVibGljCiAgICBieXRlY18xIC8vIDB4NmY3MjZkNWYKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjQ1CiAgICAvLyByZXR1cm4gc2VsZi5wdWJsaWNbcGF0aF0KICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLnB1YmxpYyBlbnRyeSBleGlzdHMKICAgIHJldHN1YgoKCi8vIGNvbnRyYWN0cy5sb2Rhc2guTG9kYXNoLnJlbW92ZShwYXRoOiBieXRlcykgLT4gdm9pZDoKcmVtb3ZlOgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo0Ny00OAogICAgLy8gQGFiaW1ldGhvZCgpCiAgICAvLyBkZWYgcmVtb3ZlKHNlbGYsIHBhdGg6IFN0cmluZykgLT4gTm9uZToKICAgIHByb3RvIDEgMAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo0OQogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgPT0gR2xvYmFsLmNyZWF0b3JfYWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjUwCiAgICAvLyBsb2coYiJSZW1vdmluZyB7cGF0aH0iKQogICAgcHVzaGJ5dGVzIDB4NTI2NTZkNmY3NjY5NmU2NzIwN2I3MDYxNzQ2ODdkCiAgICBsb2cKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NTEKICAgIC8vIGFzc2VydCBwYXRoIGluIHNlbGYucHVibGljCiAgICBieXRlY18xIC8vIDB4NmY3MjZkNWYKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo1MwogICAgLy8gYXNzZXJ0IHJlZi5kZWxldGUoKQogICAgZnJhbWVfZGlnIC0xCiAgICBib3hfZGVsCiAgICBhc3NlcnQKICAgIHJldHN1YgoKCi8vIGNvbnRyYWN0cy5sb2Rhc2guTG9kYXNoLmNvbmNhdChwYXRoOiBieXRlcywgdmFsdWU6IGJ5dGVzKSAtPiB2b2lkOgpjb25jYXQ6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjU1LTU2CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIC8vIGRlZiBjb25jYXQoc2VsZiwgcGF0aDogU3RyaW5nLCB2YWx1ZTogU3RyaW5nKSAtPiBOb25lOgogICAgcHJvdG8gMiAwCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjU4CiAgICAvLyBhc3NlcnQgVHhuLnNlbmRlciA9PSBHbG9iYWwuY3JlYXRvcl9hZGRyZXNzCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBhc3NlcnQKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NTkKICAgIC8vIGxvZyhiIkFkZGluZyB7dmFsdWV9IHRvIHtwYXRofSIpCiAgICBwdXNoYnl0ZXMgMHg0MTY0NjQ2OTZlNjcyMDdiNzY2MTZjNzU2NTdkMjA3NDZmMjA3YjcwNjE3NDY4N2QKICAgIGxvZwogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo2MAogICAgLy8gYXNzZXJ0IHBhdGggaW4gc2VsZi5wdWJsaWMKICAgIGJ5dGVjXzEgLy8gMHg2ZjcyNmQ1ZgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NjEKICAgIC8vIHNlbGYucHVibGljW3BhdGhdID0gc2VsZi5wdWJsaWNbcGF0aF0gKyB2YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5wdWJsaWMgZW50cnkgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgcmV0c3ViCgoKLy8gY29udHJhY3RzLmxvZGFzaC5Mb2Rhc2gucmVjbGFpbShhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKcmVjbGFpbToKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NjMtNjQKICAgIC8vIEBhYmltZXRob2QoKQogICAgLy8gZGVmIHJlY2xhaW0oc2VsZiwgYW1vdW50OiBVSW50NjQpIC0+IE5vbmU6CiAgICBwcm90byAxIDAKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NjUKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IEdsb2JhbC5jcmVhdG9yX2FkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo2NgogICAgLy8gbG9nKGIiUmVjbGFpbWluZyBNQlIiKQogICAgcHVzaGJ5dGVzIDB4NTI2NTYzNmM2MTY5NmQ2OTZlNjcyMDRkNDI1MgogICAgbG9nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjY3CiAgICAvLyBpdHhuLlBheW1lbnQoc2VuZGVyPUdsb2JhbC5jdXJyZW50X2FwcGxpY2F0aW9uX2FkZHJlc3MsIHJlY2VpdmVyPUdsb2JhbC5jcmVhdG9yX2FkZHJlc3MsIGFtb3VudD1hbW91bnQsIGZlZT0wKS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBTZW5kZXIKICAgIGludGNfMCAvLyBwYXkKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMSAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBhbGdvcHkuYXJjNC5BUkM0Q29udHJhY3QuY2xlYXJfc3RhdGVfcHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMSAvLyAxCiAgICByZXR1cm4K" }, "bareActions": { "create": ["NoOp"], "call": ["DeleteApplication"] } };
class BinaryStateValue {
    value;
    constructor(value) {
        this.value = value;
    }
    asByteArray() {
        return this.value;
    }
    asString() {
        return this.value !== undefined ? Buffer.from(this.value).toString('utf-8') : undefined;
    }
}
/**
 * Exposes methods for constructing `AppClient` params objects for ABI calls to the Lodash smart contract
 */
export class LodashParamsFactory {
    /**
     * Constructs a no op call for the assign(string)void ABI method
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static assign(params) {
        return {
            ...params,
            method: 'assign(string)void',
            args: Array.isArray(params.args) ? params.args : [params.args.value],
        };
    }
    /**
     * Constructs a no op call for the set(string,string)void ABI method
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static set(params) {
        return {
            ...params,
            method: 'set(string,string)void',
            args: Array.isArray(params.args) ? params.args : [params.args.path, params.args.value],
        };
    }
    /**
     * Constructs a no op call for the get(string)string ABI method
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static get(params) {
        return {
            ...params,
            method: 'get(string)string',
            args: Array.isArray(params.args) ? params.args : [params.args.path],
        };
    }
    /**
     * Constructs a no op call for the remove(string)void ABI method
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static remove(params) {
        return {
            ...params,
            method: 'remove(string)void',
            args: Array.isArray(params.args) ? params.args : [params.args.path],
        };
    }
    /**
     * Constructs a no op call for the concat(string,string)void ABI method
     *
     * Concatenates a value to an existing box.
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static concat(params) {
        return {
            ...params,
            method: 'concat(string,string)void',
            args: Array.isArray(params.args) ? params.args : [params.args.path, params.args.value],
        };
    }
    /**
     * Constructs a no op call for the reclaim(uint64)void ABI method
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static reclaim(params) {
        return {
            ...params,
            method: 'reclaim(uint64)void',
            args: Array.isArray(params.args) ? params.args : [params.args.amount],
        };
    }
}
/**
 * A factory to create and deploy one or more instance of the Lodash smart contract and to create one or more app clients to interact with those (or other) app instances
 */
export class LodashFactory {
    /**
     * The underlying `AppFactory` for when you want to have more flexibility
     */
    appFactory;
    /**
     * Creates a new instance of `LodashFactory`
     *
     * @param params The parameters to initialise the app factory with
     */
    constructor(params) {
        this.appFactory = new _AppFactory({
            ...params,
            appSpec: APP_SPEC,
        });
    }
    /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
    get appName() {
        return this.appFactory.appName;
    }
    /** The ARC-56 app spec being used */
    get appSpec() {
        return APP_SPEC;
    }
    /** A reference to the underlying `AlgorandClient` this app factory is using. */
    get algorand() {
        return this.appFactory.algorand;
    }
    /**
     * Returns a new `AppClient` client for an app instance of the given ID.
     *
     * Automatically populates appName, defaultSender and source maps from the factory
     * if not specified in the params.
     * @param params The parameters to create the app client
     * @returns The `AppClient`
     */
    getAppClientById(params) {
        return new LodashClient(this.appFactory.getAppClientById(params));
    }
    /**
     * Returns a new `AppClient` client, resolving the app by creator address and name
     * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
     *
     * Automatically populates appName, defaultSender and source maps from the factory
     * if not specified in the params.
     * @param params The parameters to create the app client
     * @returns The `AppClient`
     */
    async getAppClientByCreatorAndName(params) {
        return new LodashClient(await this.appFactory.getAppClientByCreatorAndName(params));
    }
    /**
     * Idempotently deploys the Lodash smart contract.
     *
     * @param params The arguments for the contract calls and any additional parameters for the call
     * @returns The deployment result
     */
    async deploy(params = {}) {
        const result = await this.appFactory.deploy({
            ...params,
        });
        return { result: result.result, appClient: new LodashClient(result.appClient) };
    }
    /**
     * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
     */
    params = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The params for a create call
             */
            bare: (params) => {
                return this.appFactory.params.bare.create(params);
            },
        },
        /**
         * Gets available deployDelete methods
         */
        deployDelete: {
            /**
             * Deletes an existing instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The params for a deployDelete call
             */
            bare: (params) => {
                return this.appFactory.params.bare.deployDelete(params);
            },
        },
    };
    /**
     * Create transactions for the current app
     */
    createTransaction = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The transaction for a create call
             */
            bare: (params) => {
                return this.appFactory.createTransaction.bare.create(params);
            },
        },
    };
    /**
     * Send calls to the current app
     */
    send = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The create result
             */
            bare: async (params) => {
                const result = await this.appFactory.send.bare.create(params);
                return { result: result.result, appClient: new LodashClient(result.appClient) };
            },
        },
    };
}
/**
 * A client to make calls to the Lodash smart contract
 */
export class LodashClient {
    /**
     * The underlying `AppClient` for when you want to have more flexibility
     */
    appClient;
    constructor(appClientOrParams) {
        this.appClient = appClientOrParams instanceof _AppClient ? appClientOrParams : new _AppClient({
            ...appClientOrParams,
            appSpec: APP_SPEC,
        });
    }
    /**
     * Checks for decode errors on the given return value and maps the return value to the return type for the given method
     * @returns The typed return value or undefined if there was no value
     */
    decodeReturnValue(method, returnValue) {
        return returnValue !== undefined ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : undefined;
    }
    /**
     * Returns a new `LodashClient` client, resolving the app by creator address and name
     * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
     * @param params The parameters to create the app client
     */
    static async fromCreatorAndName(params) {
        return new LodashClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
    }
    /**
     * Returns an `LodashClient` instance for the current network based on
     * pre-determined network-specific app IDs specified in the ARC-56 app spec.
     *
     * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
     * @param params The parameters to create the app client
     */
    static async fromNetwork(params) {
        return new LodashClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
    }
    /** The ID of the app instance this client is linked to. */
    get appId() {
        return this.appClient.appId;
    }
    /** The app address of the app instance this client is linked to. */
    get appAddress() {
        return this.appClient.appAddress;
    }
    /** The name of the app. */
    get appName() {
        return this.appClient.appName;
    }
    /** The ARC-56 app spec being used */
    get appSpec() {
        return this.appClient.appSpec;
    }
    /** A reference to the underlying `AlgorandClient` this app client is using. */
    get algorand() {
        return this.appClient.algorand;
    }
    /**
     * Get parameters to create transactions for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
     */
    params = {
        /**
         * Gets available delete methods
         */
        delete: {
            /**
             * Deletes an existing instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The delete result
             */
            bare: (params) => {
                return this.appClient.params.bare.delete(params);
            },
        },
        /**
         * Makes a clear_state call to an existing instance of the Lodash smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.params.bare.clearState(params);
        },
        /**
         * Makes a call to the Lodash smart contract using the `assign(string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        assign: (params) => {
            return this.appClient.params.call(LodashParamsFactory.assign(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `set(string,string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        set: (params) => {
            return this.appClient.params.call(LodashParamsFactory.set(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `get(string)string` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        get: (params) => {
            return this.appClient.params.call(LodashParamsFactory.get(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `remove(string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        remove: (params) => {
            return this.appClient.params.call(LodashParamsFactory.remove(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `concat(string,string)void` ABI method.
         *
         * Concatenates a value to an existing box.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        concat: (params) => {
            return this.appClient.params.call(LodashParamsFactory.concat(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `reclaim(uint64)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        reclaim: (params) => {
            return this.appClient.params.call(LodashParamsFactory.reclaim(params));
        },
    };
    /**
     * Create transactions for the current app
     */
    createTransaction = {
        /**
         * Gets available delete methods
         */
        delete: {
            /**
             * Deletes an existing instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The delete result
             */
            bare: (params) => {
                return this.appClient.createTransaction.bare.delete(params);
            },
        },
        /**
         * Makes a clear_state call to an existing instance of the Lodash smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.createTransaction.bare.clearState(params);
        },
        /**
         * Makes a call to the Lodash smart contract using the `assign(string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        assign: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.assign(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `set(string,string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        set: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.set(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `get(string)string` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        get: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.get(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `remove(string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        remove: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.remove(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `concat(string,string)void` ABI method.
         *
         * Concatenates a value to an existing box.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        concat: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.concat(params));
        },
        /**
         * Makes a call to the Lodash smart contract using the `reclaim(uint64)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        reclaim: (params) => {
            return this.appClient.createTransaction.call(LodashParamsFactory.reclaim(params));
        },
    };
    /**
     * Send calls to the current app
     */
    send = {
        /**
         * Gets available delete methods
         */
        delete: {
            /**
             * Deletes an existing instance of the Lodash smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The delete result
             */
            bare: (params) => {
                return this.appClient.send.bare.delete(params);
            },
        },
        /**
         * Makes a clear_state call to an existing instance of the Lodash smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.send.bare.clearState(params);
        },
        /**
         * Makes a call to the Lodash smart contract using the `assign(string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        assign: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.assign(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the Lodash smart contract using the `set(string,string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        set: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.set(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the Lodash smart contract using the `get(string)string` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        get: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.get(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the Lodash smart contract using the `remove(string)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        remove: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.remove(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the Lodash smart contract using the `concat(string,string)void` ABI method.
         *
         * Concatenates a value to an existing box.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        concat: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.concat(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the Lodash smart contract using the `reclaim(uint64)void` ABI method.
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        reclaim: async (params) => {
            const result = await this.appClient.send.call(LodashParamsFactory.reclaim(params));
            return { ...result, return: result.return };
        },
    };
    /**
     * Clone this app client with different params
     *
     * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
     * @returns A new app client with the altered params
     */
    clone(params) {
        return new LodashClient(this.appClient.clone(params));
    }
    /**
     * Methods to access state for the current Lodash app
     */
    state = {
        /**
         * Methods to access global state for the current Lodash app
         */
        global: {
            /**
             * Get all current keyed values from global state
             */
            getAll: async () => {
                const result = await this.appClient.state.global.getAll();
                return {
                    counter: result.counter,
                    type: new BinaryStateValue(result.type),
                };
            },
            /**
             * Get the current value of the counter key in global state
             */
            counter: async () => { return (await this.appClient.state.global.getValue("counter")); },
            /**
             * Get the current value of the type key in global state
             */
            type: async () => { return new BinaryStateValue((await this.appClient.state.global.getValue("type"))); },
        },
    };
    newGroup() {
        const client = this;
        const composer = this.algorand.newGroup();
        let promiseChain = Promise.resolve();
        const resultMappers = [];
        return {
            /**
             * Add a assign(string)void method call against the Lodash contract
             */
            assign(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.assign(params)));
                resultMappers.push(undefined);
                return this;
            },
            /**
             * Add a set(string,string)void method call against the Lodash contract
             */
            set(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.set(params)));
                resultMappers.push(undefined);
                return this;
            },
            /**
             * Add a get(string)string method call against the Lodash contract
             */
            get(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.get(params)));
                resultMappers.push((v) => client.decodeReturnValue('get(string)string', v));
                return this;
            },
            /**
             * Add a remove(string)void method call against the Lodash contract
             */
            remove(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.remove(params)));
                resultMappers.push(undefined);
                return this;
            },
            /**
             * Add a concat(string,string)void method call against the Lodash contract
             */
            concat(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.concat(params)));
                resultMappers.push(undefined);
                return this;
            },
            /**
             * Add a reclaim(uint64)void method call against the Lodash contract
             */
            reclaim(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.reclaim(params)));
                resultMappers.push(undefined);
                return this;
            },
            get delete() {
                return {
                    bare: (params) => {
                        promiseChain = promiseChain.then(() => composer.addAppDelete(client.params.delete.bare(params)));
                        return this;
                    },
                };
            },
            /**
             * Add a clear state call to the Lodash contract
             */
            clearState(params) {
                promiseChain = promiseChain.then(() => composer.addAppCall(client.params.clearState(params)));
                return this;
            },
            addTransaction(txn, signer) {
                promiseChain = promiseChain.then(() => composer.addTransaction(txn, signer));
                return this;
            },
            async composer() {
                await promiseChain;
                return composer;
            },
            async simulate(options) {
                await promiseChain;
                const result = await (!options ? composer.simulate() : composer.simulate(options));
                return {
                    ...result,
                    returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i](val) : val.returnValue)
                };
            },
            async send(params) {
                await promiseChain;
                const result = await composer.send(params);
                return {
                    ...result,
                    returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i](val) : val.returnValue)
                };
            }
        };
    }
}
//# sourceMappingURL=client.js.map