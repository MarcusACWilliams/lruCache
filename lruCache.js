/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map();
    this.lru   = [];
    this.capacity = capacity;
    
    this.mostRecent = new ListNode(null,null);
    this.leastRecent = this.mostRecent;
    this.mostRecent.next = this.leastRecent;
    this.leastRecent.prev = this.mostRecent;

    this.cache.set(null,null);

};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let val;
    let nodeToDelete;

    // If key is found return value AND!!! move key to top of the list!!!
    if( nodeToDelete = this.cache.get(key)) {

        // Slice node from list
        nodeToDelete.prev.next = nodeToDelete.next; // (nodeToDelete.prev) --> point forward  
        nodeToDelete.next.prev = nodeToDelete.prev; // (nodeToDelete.next) --> point backward
        
        // Push node back onto list
        nodeToDelete.next = this.mostRecent;
        nodeToDelete.prev = null;
        this.mostRecent.prev = nodeToDelete;
        this.mostRecent = nodeToDelete;
        
        // Return cached value
        return nodeToDelete.val;
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
    let nodeToDelete;

    // If Key IS FOUND remove from cache and list
    if( nodeToDelete = this.cache.get(key)) {

        nodeToDelete.prev.next = nodeToDelete.next; // (nodeToDelete.prev) --> point forward  
        nodeToDelete.next.prev = nodeToDelete.prev; // (nodeToDelete.next) --> point backward
        this.cache.delete(nodeToDelete.key);        // Delete node from cache
        
        // Remove node refrences...
        nodeToDelete.next = null;
        nodeToDelete.prev = null;
        nodeToDelete = null;

    }
    else {
        if(this.cache.size == this.capacity) { 
            
            this.cache.delete(this.leastRecent.key);
            nodeToDelete = this.leastRecent;
            this.leastRecent = this.leastRecent.prev;
            nodeToDelete.next = null;

        }
    }

    // Add new node to END of the list
    let newNode = new ListNode(value, key);
    newNode.next = this.mostRecent;
    this.mostRecent.prev = newNode
    this.mostRecent = newNode;

    //this.mostRecent.next.prev = this.mostRecent;
    //this.mostRecent = this.mostRecent.next;
    //this.mostRecent.next = null;

    this.cache.set(key, this.mostRecent);

};

LRUCache.prototype.pop = function() {

};

function ListNode(val, key) {
    this.val = val;
    this.key = key;
    this.prev = this.next = null;
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 * ["LRUCache","put","put","get","put","get","put","get","get","get"]
 * [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
 */

 var lru = new LRUCache(2);
 lru.put(1,1);
 lru.put(2,2);
 lru.get(1);
 lru.put(3,3);
 lru.get(2);
 lru.put(4,4);
 lru.get(1);
 lru.get(3);
 lru.get(3);
