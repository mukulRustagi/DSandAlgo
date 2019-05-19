package da;

public class Polynomial {

    int arr[];

    Polynomial() {
        arr = new int[5];
    }

    public Polynomial(int poly) {
        arr = new int[poly];
    }

    public void setCoefficient(int degree, int coeff) {
        if (degree > arr.length) {
            extend(degree);
        }
        arr[degree] = coeff;

    }

    void extend(int degree) {
        int temp[] = arr;
        arr = new int[degree + 1];
        for (int i = 0; i < temp.length; i++) {
            arr[i] = temp[i];
        }
    }

    // Prints all the terms(only terms with non zero coefficients are to be printed)
    // in increasing order of degree.
    public void print() {

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != 0)
                System.out.print(arr[i] + "x" + i + " ");
        }
    }

    // Adds two polynomials and returns a new polynomial which has result
    public Polynomial add(Polynomial p) {
        int n = (arr.length < p.arr.length) ? arr.length : p.arr.length;
        Polynomial p1 = new Polynomial((arr.length > p.arr.length) ? arr.length : p.arr.length);

        int i;
        for (i = 0; i < n; i++) {

            p1.setCoefficient(i, p.arr[i] + this.arr[i]);
        }
        if (n == arr.length) {
            for (; i < p.arr.length; i++) {

                p1.setCoefficient(i, p.arr[i]);
            }
        } else {
            for (; i < arr.length; i++) {

                p1.setCoefficient(i, arr[i]);
            }
        }
        return p1;
    }

    // Subtracts two polynomials and returns a new polynomial which has result
    public Polynomial subtract(Polynomial p) {
        int n = (arr.length < p.arr.length) ? arr.length : p.arr.length;
        Polynomial p1 = new Polynomial((arr.length > p.arr.length) ? arr.length : p.arr.length);

        int i;
        for (i = 0; i < n; i++) {

            p1.setCoefficient(i, this.arr[i] - p.arr[i]);
        }
        if (n == arr.length) {
            for (; i < p.arr.length; i++) {

                p1.setCoefficient(i, -p.arr[i]);
            }
        } else {
            for (; i < arr.length; i++) {

                p1.setCoefficient(i, arr[i]);
            }
        }
        return p1;
    }

    // Multiply two polynomials and returns a new polynomial which has result
    public Polynomial multiply(Polynomial p) {
        Polynomial p1 = new Polynomial(this.arr.length * p.arr.length);
        for (int i = 0; i < this.arr.length; i++) {
            for (int j = 0; j < p.arr.length; j++) {

                p1.setCoefficient(j + i, p1.arr[i + j] + this.arr[i] * p.arr[j]);

            }
        }
        return p1;
    }

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int n = s.nextInt();
        int degree1[] = new int[n];
        for (int i = 0; i < n; i++) {
            degree1[i] = s.nextInt();
        }
        int coeff1[] = new int[n];
        for (int i = 0; i < n; i++) {
            coeff1[i] = s.nextInt();
        }
        Polynomial first = new Polynomial();
        for (int i = 0; i < n; i++) {
            first.setCoefficient(degree1[i], coeff1[i]);
        }
        n = s.nextInt();
        int degree2[] = new int[n];
        for (int i = 0; i < n; i++) {
            degree2[i] = s.nextInt();
        }
        int coeff2[] = new int[n];
        for (int i = 0; i < n; i++) {
            coeff2[i] = s.nextInt();
        }
        Polynomial second = new Polynomial();
        for (int i = 0; i < n; i++) {
            second.setCoefficient(degree2[i], coeff2[i]);
        }
        int choice = s.nextInt();
        Polynomial result;
        first.print();
        System.out.println("");
        second.print();
        System.out.println("");
        switch (choice) {
        // Add
        case 1:
            result = first.add(second);
            result.print();
            break;
        // Subtract
        case 2:
            result = first.subtract(second);
            result.print();
            break;
        // Multiply
        case 3:
            result = first.multiply(second);
            result.print();
            break;
        }

    }

}
