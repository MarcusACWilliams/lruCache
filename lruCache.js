/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map();
    this.lru   = [];
    this.head = ListNode(null);
    this.leastRecent;
    this.tail = head;
    head.next = tail;

};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let val;

    // If key is found return value AND!!! move key to top of the list!!!
    if( val = this.cache.get(key)) {

    }
    else {
        return -1;
    }
};

/**
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let val;

    // If Key is found move key to the top of the list
    if( val = this.cache.get(key)) {

    }
    else {
        if(this.cache.size == capacity) { 
            least = this.head;
            this.cache.delete(this.head.key);
            this.head = this.head.next;

        }
    }
    // Add new node to END of the list
    mostRecent.next = new ListNode(value, key);
    mostRecent.next.prev = mostRecent;
    mostRecent = mostRecent.next;
    mostRecent.next = null;

    this.cache.set(key, mostRecent);

};


function ListNode(val, key) {
    this.val = val;
    this.key = key;
    this.prev = this.next = null;
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */