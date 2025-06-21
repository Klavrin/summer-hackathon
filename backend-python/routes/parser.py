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
    quizzes = ast.literal_eval(input)
    return quizzes

def parse_test(input):
    """Takes as input readable python list of strings
       and return the object in memory.
       'task'
    """
    tests = ast.literal_eval(input)
    return tests

def parse_flashcards(input):
    """Takes as input readable python dictionary string
       and return the object in memory.
       'front'
       'backshot'
    """
    flashcards = ast.literal_eval(input)
    return flashcards
