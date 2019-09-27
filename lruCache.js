/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map(capacity);
    this.lru   = [];
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
    let least;

    // If Key is found move key to the top of the list
    if( val = this.cache.get(key)) {

    }
    else {
        if(this.lru.length == capacity) { 
            least = this.lru.shift();
            this.cache.delete(key);
        }
    }
    // Add new node to top of the list
    this.lru.push(new ListNode(value));
    this.cache.add(key, value);

};


function ListNode(val) {
    this.val = val;
    this.prev = this.next = null;
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */