import tensorflow as tf


def main():
    print("Hello, TensorFlow!")
    print(f"TensorFlow version: {tf.__version__}")
    
    # Create a simple tensor operation - classic "Hello World" in TensorFlow
    # Create constant tensors
    hello = tf.constant('Hello, ')
    world = tf.constant('World!')
    
    # String concatenation
    hello_world = tf.strings.join([hello, world])
    print(f"TensorFlow says: {hello_world.numpy().decode('utf-8')}")
    
    # Simple mathematical operation
    a = tf.constant(2.0)
    b = tf.constant(3.0)
    result = tf.add(a, b)
    print(f"TensorFlow computation: {a.numpy()} + {b.numpy()} = {result.numpy()}")
    
    # Create a simple matrix operation
    matrix1 = tf.constant([[1.0, 2.0], [3.0, 4.0]])
    matrix2 = tf.constant([[2.0, 0.0], [0.0, 2.0]])
    product = tf.matmul(matrix1, matrix2)
    print("Matrix multiplication result:")
    print(product.numpy())


if __name__ == "__main__":
    main()
