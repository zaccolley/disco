/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package helloworldappl;

/**
 *
 * @author up665219
 */
public class LibClass {

    public static String acrostic(String[] args) {
        StringBuffer b = new StringBuffer();     // “b” is an object of StringBuffer class
    /* StringBuffer is a Java class, it is like a String, but can be modified. At any point in time it contains some particular sequence of characters, but the length and content of the sequence can be changed through certain method calls.  */
        for (int i = 0; i < args.length; i++) {  	 // a loop to scan all elements of the array args[ ] 
            if (args[i].length() > i) {	            	// if the length of the “i”th element is greater than “i” …
                b.append(args[i].charAt(i)); 	// append() is a method from StringBuffer class
            } else {
                b.append('?');
            }
        }
        return b.toString();
        // toString() is a method that returns a string representing the data in the object “b”
    }
}
