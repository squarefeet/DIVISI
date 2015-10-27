DIVISI message flow
-------------------

* Incoming message
	* Create new DIVISI message
	* If message is NOTE type, then apply global tuning.

* pipe to data-changer
	* rinse and repeat

* pipe to output
	* Release DIVISI message.



Internal message stucture
-------------------------

```javascript
{
	data: BufferPool.get( ... ),
	receivedTime: ...,
	timestamp: ...
}