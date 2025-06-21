import ast

def parse_quiz(input):
    """Takes as input readable python dictionary string
       and return the object in memory.

       Parameters:
           'question'
           'choice1'
           'choice2'
           'choice3'
           'choice4'
           'answer'
    """
    quiz_start = 0
    if input[0]!='[':
        quiz_start = input.index('[')
    input = input[quiz_start:]
    quizzes = ast.literal_eval(input)
    return quizzes

def parse_test(input):
    """Takes as input readable python list of strings
       and return the list of strings in memory.
    """
    test_start = 0
    if input[0] != '[':
        test_start = input.index('[')
    input = input[test_start:]
    tests = ast.literal_eval(input)
    return tests

def parse_flashcards(input):
    """Takes as input readable python dictionary string
       and return the object in memory.
       'front'
       'backshot'
    """
    flash_start = 0
    if input[0] != '[':
        flash_start = input.index('[')
    input = input[flash_start:]
    flashcards = ast.literal_eval(input)
    return flashcards