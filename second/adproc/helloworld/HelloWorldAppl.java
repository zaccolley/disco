/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package helloworldappl;

/**
 *
 * @author up665219
 */
public class HelloWorldAppl {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String result = LibClass.acrostic(args);
		System.out.println("\nResult: " + result +"\n");
    }
}
