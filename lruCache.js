/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
    
    this.mostRecent = {next: null};
    this.leastRecent = {prev: null};
    this.mostRecent.next = this.leastRecent;
    this.leastRecent.prev = this.mostRecent;

    //this.cache.set(null,null);

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

        if(nodeToDelete != this.mostRecent.next) {

            // Slice node from list
            nodeToDelete.prev.next = nodeToDelete.next; // (nodeToDelete.prev) --> point forward  
            nodeToDelete.next.prev = nodeToDelete.prev; // (nodeToDelete.next) --> point backward
            
            // Push node back onto list
            nodeToDelete.next = this.mostRecent.next;
            this.mostRecent.next.prev = nodeToDelete;
            
            nodeToDelete.prev = this.mostRecent;
            this.mostRecent.next = nodeToDelete;
        }

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
        nodeToDelete.val = value;
        this.cache.set(key, nodeToDelete);        // Delete node from cache

        nodeToDelete.next = this.mostRecent.next;
        this.mostRecent.next.prev = nodeToDelete;
        nodeToDelete.prev = this.mostRecent;
        this.mostRecent.next = nodeToDelete;
    
        nodeToDelete = null;

    }
    else {
        if(this.cache.size == this.capacity) { 
            nodeToDelete = this.leastRecent.prev;

            nodeToDelete.prev.next = nodeToDelete.next; // (nodeToDelete.prev) --> point forward  
            nodeToDelete.next.prev = nodeToDelete.prev; // (nodeToDelete.next) --> point backward
            this.cache.delete(nodeToDelete.key);
        }

    // Add new node to END of the list
    let newNode = new ListNode(value, key);
    newNode.next = this.mostRecent.next;
    this.mostRecent.next.prev = newNode;
    newNode.prev = this.mostRecent;
    this.mostRecent.next = newNode;

    this.cache.set(key, this.mostRecent.next);
    }

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