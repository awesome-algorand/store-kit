import { getArc56ReturnValue } from '@algorandfoundation/algokit-utils/types/app-arc56';
import { AppClient as _AppClient, } from '@algorandfoundation/algokit-utils/types/app-client';
import { AppFactory as _AppFactory } from '@algorandfoundation/algokit-utils/types/app-factory';
export const APP_SPEC = { "arcs": [], "name": "Lodash", "desc": "Object Storage on Algorand\n\n    Attributes\n    ----------\n    public : BoxMap\n        Boxes that store the object\n    ", "structs": {}, "methods": [{ "name": "set", "args": [{ "name": "path", "type": "string" }, { "name": "value", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "get", "args": [{ "name": "path", "type": "string" }], "returns": { "type": "string" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "remove", "args": [{ "name": "path", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "concat", "desc": "Concatenates a value to an existing box.", "args": [{ "name": "path", "type": "string" }, { "name": "value", "type": "string" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }, { "name": "reclaim", "args": [{ "name": "amount", "type": "uint64" }], "returns": { "type": "void" }, "events": [], "actions": { "create": [], "call": ["NoOp"] } }], "state": { "schema": { "global": { "ints": 0, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": {}, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": {} } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5fX2FsZ29weV9lbnRyeXBvaW50X3dpdGhfaW5pdCgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAxIDAgVE1QTF9ERUxFVEFCTEUKICAgIGJ5dGVjYmxvY2sgMHg2ZjcyNmQ1ZgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo3CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIHR4biBOdW1BcHBBcmdzCiAgICBieiBtYWluX2JhcmVfcm91dGluZ0AxMAogICAgcHVzaGJ5dGVzcyAweGE4NjE3Y2NkIDB4YzA4NTBhZWUgMHg4ZTg5MDBiOSAweDUzMDEzYmRiIDB4NGVmZjUxNmQgLy8gbWV0aG9kICJzZXQoc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJnZXQoc3RyaW5nKXN0cmluZyIsIG1ldGhvZCAicmVtb3ZlKHN0cmluZyl2b2lkIiwgbWV0aG9kICJjb25jYXQoc3RyaW5nLHN0cmluZyl2b2lkIiwgbWV0aG9kICJyZWNsYWltKHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9zZXRfcm91dGVANSBtYWluX2dldF9yb3V0ZUA2IG1haW5fcmVtb3ZlX3JvdXRlQDcgbWFpbl9jb25jYXRfcm91dGVAOCBtYWluX3JlY2xhaW1fcm91dGVAOQoKbWFpbl9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo3CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIGludGNfMSAvLyAwCiAgICByZXR1cm4KCm1haW5fcmVjbGFpbV9yb3V0ZUA5OgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo1MgogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NwogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBidG9pCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjUyCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgcmVjbGFpbQogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKbWFpbl9jb25jYXRfcm91dGVAODoKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NDQKICAgIC8vIEBhYmltZXRob2QoKQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjcKICAgIC8vIGNsYXNzIExvZGFzaChBUkM0Q29udHJhY3QpOgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGV4dHJhY3QgMiAwCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjQ0CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgY29uY2F0CiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgptYWluX3JlbW92ZV9yb3V0ZUA3OgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozNgogICAgLy8gQGFiaW1ldGhvZCgpCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIG5vdCBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NwogICAgLy8gY2xhc3MgTG9kYXNoKEFSQzRDb250cmFjdCk6CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBleHRyYWN0IDIgMAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozNgogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBjYWxsc3ViIHJlbW92ZQogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKbWFpbl9nZXRfcm91dGVANjoKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MjkKICAgIC8vIEBhYmltZXRob2QoKQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjcKICAgIC8vIGNsYXNzIExvZGFzaChBUkM0Q29udHJhY3QpOgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZXh0cmFjdCAyIDAKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MjkKICAgIC8vIEBhYmltZXRob2QoKQogICAgY2FsbHN1YiBnZXQKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCm1haW5fc2V0X3JvdXRlQDU6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjIzCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgbm90IE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo3CiAgICAvLyBjbGFzcyBMb2Rhc2goQVJDNENvbnRyYWN0KToKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBleHRyYWN0IDIgMAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weToyMwogICAgLy8gQGFiaW1ldGhvZCgpCiAgICBjYWxsc3ViIHNldAogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKbWFpbl9iYXJlX3JvdXRpbmdAMTA6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjcKICAgIC8vIGNsYXNzIExvZGFzaChBUkM0Q29udHJhY3QpOgogICAgcHVzaGludCA1IC8vIDUKICAgIGludGNfMSAvLyAwCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBtYXRjaCBtYWluX29uX2RlbGV0ZUAxMSBtYWluX19fYWxnb3B5X2RlZmF1bHRfY3JlYXRlQDEyCiAgICBiIG1haW5fYWZ0ZXJfaWZfZWxzZUAxMwoKbWFpbl9fX2FsZ29weV9kZWZhdWx0X2NyZWF0ZUAxMjoKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIGNyZWF0aW5nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgptYWluX29uX2RlbGV0ZUAxMToKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MTgKICAgIC8vIEBiYXJlbWV0aG9kKGFsbG93X2FjdGlvbnM9WyJEZWxldGVBcHBsaWNhdGlvbiJdKQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICBjYWxsc3ViIG9uX2RlbGV0ZQogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIGNvbnRyYWN0cy5sb2Rhc2guTG9kYXNoLm9uX2RlbGV0ZSgpIC0+IHZvaWQ6Cm9uX2RlbGV0ZToKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MjAKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IEdsb2JhbC5jcmVhdG9yX2FkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weToyMQogICAgLy8gYXNzZXJ0IFRlbXBsYXRlVmFyW1VJbnQ2NF0oIkRFTEVUQUJMRSIpCiAgICBpbnRjXzIgLy8gVE1QTF9ERUxFVEFCTEUKICAgIGFzc2VydAogICAgcmV0c3ViCgoKLy8gY29udHJhY3RzLmxvZGFzaC5Mb2Rhc2guc2V0KHBhdGg6IGJ5dGVzLCB2YWx1ZTogYnl0ZXMpIC0+IHZvaWQ6CnNldDoKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MjMtMjQKICAgIC8vIEBhYmltZXRob2QoKQogICAgLy8gZGVmIHNldChzZWxmLCBwYXRoOiBTdHJpbmcsIHZhbHVlOiBTdHJpbmcpIC0+IE5vbmU6CiAgICBwcm90byAyIDAKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MjUKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IEdsb2JhbC5jcmVhdG9yX2FkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weToyNgogICAgLy8gbG9nKGIiU2V0dGluZyB7cGF0aH0gdG8ge3ZhbHVlfSIpCiAgICBwdXNoYnl0ZXMgMHg1MzY1NzQ3NDY5NmU2NzIwN2I3MDYxNzQ2ODdkMjA3NDZmMjA3Yjc2NjE2Yzc1NjU3ZAogICAgbG9nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjI3CiAgICAvLyBzZWxmLnB1YmxpY1twYXRoXSA9IHZhbHVlCiAgICBieXRlY18wIC8vIDB4NmY3MjZkNWYKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgZnJhbWVfZGlnIC0xCiAgICBib3hfcHV0CiAgICByZXRzdWIKCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5nZXQocGF0aDogYnl0ZXMpIC0+IGJ5dGVzOgpnZXQ6CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjI5LTMwCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIC8vIGRlZiBnZXQoc2VsZiwgcGF0aDogU3RyaW5nKSAtPiBTdHJpbmc6CiAgICBwcm90byAxIDEKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MzEKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IEdsb2JhbC5jcmVhdG9yX2FkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozMgogICAgLy8gbG9nKGIiR2V0dGluZyB7cGF0aH0gdG8ge3ZhbHVlfSIpCiAgICBwdXNoYnl0ZXMgMHg0NzY1NzQ3NDY5NmU2NzIwN2I3MDYxNzQ2ODdkMjA3NDZmMjA3Yjc2NjE2Yzc1NjU3ZAogICAgbG9nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjMzCiAgICAvLyBhc3NlcnQgcGF0aCBpbiBzZWxmLnB1YmxpYwogICAgYnl0ZWNfMCAvLyAweDZmNzI2ZDVmCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozNAogICAgLy8gcmV0dXJuIHNlbGYucHVibGljW3BhdGhdCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5wdWJsaWMgZW50cnkgZXhpc3RzCiAgICByZXRzdWIKCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5yZW1vdmUocGF0aDogYnl0ZXMpIC0+IHZvaWQ6CnJlbW92ZToKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MzYtMzcKICAgIC8vIEBhYmltZXRob2QoKQogICAgLy8gZGVmIHJlbW92ZShzZWxmLCBwYXRoOiBTdHJpbmcpIC0+IE5vbmU6CiAgICBwcm90byAxIDAKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6MzgKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IEdsb2JhbC5jcmVhdG9yX2FkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTozOQogICAgLy8gbG9nKGIiUmVtb3Zpbmcge3BhdGh9IikKICAgIHB1c2hieXRlcyAweDUyNjU2ZDZmNzY2OTZlNjcyMDdiNzA2MTc0Njg3ZAogICAgbG9nCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjQwCiAgICAvLyBhc3NlcnQgcGF0aCBpbiBzZWxmLnB1YmxpYwogICAgYnl0ZWNfMCAvLyAweDZmNzI2ZDVmCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NDIKICAgIC8vIGFzc2VydCByZWYuZGVsZXRlKCkKICAgIGZyYW1lX2RpZyAtMQogICAgYm94X2RlbAogICAgYXNzZXJ0CiAgICByZXRzdWIKCgovLyBjb250cmFjdHMubG9kYXNoLkxvZGFzaC5jb25jYXQocGF0aDogYnl0ZXMsIHZhbHVlOiBieXRlcykgLT4gdm9pZDoKY29uY2F0OgogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo0NC00NQogICAgLy8gQGFiaW1ldGhvZCgpCiAgICAvLyBkZWYgY29uY2F0KHNlbGYsIHBhdGg6IFN0cmluZywgdmFsdWU6IFN0cmluZykgLT4gTm9uZToKICAgIHByb3RvIDIgMAogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo0NwogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgPT0gR2xvYmFsLmNyZWF0b3JfYWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjQ4CiAgICAvLyBsb2coYiJBZGRpbmcge3ZhbHVlfSB0byB7cGF0aH0iKQogICAgcHVzaGJ5dGVzIDB4NDE2NDY0Njk2ZTY3MjA3Yjc2NjE2Yzc1NjU3ZDIwNzQ2ZjIwN2I3MDYxNzQ2ODdkCiAgICBsb2cKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NDkKICAgIC8vIGFzc2VydCBwYXRoIGluIHNlbGYucHVibGljCiAgICBieXRlY18wIC8vIDB4NmY3MjZkNWYKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjUwCiAgICAvLyBzZWxmLnB1YmxpY1twYXRoXSA9IHNlbGYucHVibGljW3BhdGhdICsgdmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYucHVibGljIGVudHJ5IGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGJveF9wdXQKICAgIHJldHN1YgoKCi8vIGNvbnRyYWN0cy5sb2Rhc2guTG9kYXNoLnJlY2xhaW0oYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnJlY2xhaW06CiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjUyLTUzCiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIC8vIGRlZiByZWNsYWltKHNlbGYsIGFtb3VudDogVUludDY0KSAtPiBOb25lOgogICAgcHJvdG8gMSAwCiAgICAvLyAvaG9tZS96ZXJvL1Byb2plY3RzL3N0b3JlLWtpdC9jb250cmFjdHMvbG9kYXNoLnB5OjU0CiAgICAvLyBhc3NlcnQgVHhuLnNlbmRlciA9PSBHbG9iYWwuY3JlYXRvcl9hZGRyZXNzCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBhc3NlcnQKICAgIC8vIC9ob21lL3plcm8vUHJvamVjdHMvc3RvcmUta2l0L2NvbnRyYWN0cy9sb2Rhc2gucHk6NTUKICAgIC8vIGxvZyhiIlJlY2xhaW1pbmcgTUJSIikKICAgIHB1c2hieXRlcyAweDUyNjU2MzZjNjE2OTZkNjk2ZTY3MjA0ZDQyNTIKICAgIGxvZwogICAgLy8gL2hvbWUvemVyby9Qcm9qZWN0cy9zdG9yZS1raXQvY29udHJhY3RzL2xvZGFzaC5weTo1NgogICAgLy8gaXR4bi5QYXltZW50KHNlbmRlcj1HbG9iYWwuY3VycmVudF9hcHBsaWNhdGlvbl9hZGRyZXNzLCByZWNlaXZlcj1HbG9iYWwuY3JlYXRvcl9hZGRyZXNzLCBhbW91bnQ9YW1vdW50LCBmZWU9MCkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgU2VuZGVyCiAgICBpbnRjXzAgLy8gcGF5CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBhbGdvcHkuYXJjNC5BUkM0Q29udHJhY3QuY2xlYXJfc3RhdGVfcHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMSAvLyAxCiAgICByZXR1cm4K" }, "bareActions": { "create": ["NoOp"], "call": ["DeleteApplication"] } };
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
    state = {};
    newGroup() {
        const client = this;
        const composer = this.algorand.newGroup();
        let promiseChain = Promise.resolve();
        const resultMappers = [];
        return {
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