/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map();
    this.lru   = [];
    
    this.mostRecent = new ListNode(null,null);
    this.leastRecent = mostRecent;
    mostRecent.next = leastRecent;
    leastRecent.prev = mostRecent;

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

        nodeToDelete.prev.next = nodeToDelete.next; // (nodeToDelete.prev) --> point forward  
        nodeToDelete.next.prev = nodeToDelete.prev; // (nodeToDelete.next) --> point backward
        //this.cache.delete(nodeToDelete.key);        // Delete node from cache
        
        nodeToDelete.next = this.mostRecent;
        this.mostRecent.prev = nodeToDelete;
        this.mostRecent = nodeToDelete;

        // Remove node refrences...
        nodeToDelete.next = null;
        nodeToDelete.prev = null;
        nodeToDelete = null;
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
        if(this.cache.size == capacity) { 
            
            this.cache.delete(this.leastRecent.key);
            nodeToDelete = leastRecent;
            leastRecent = leastRecent.next;
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
 */

 var lru = new LRUCache(3);
 lru.put(1,1);
 lru.put(2,2);
 lru.put(3,3);