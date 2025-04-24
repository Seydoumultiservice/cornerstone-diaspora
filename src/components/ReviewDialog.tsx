
import React from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from '../context/LanguageContext';

type ReviewFormData = {
  review: string;
};

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onClose }) => {
  const { language } = useLanguage();
  const form = useForm<ReviewFormData>();

  const onSubmit = (data: ReviewFormData) => {
    console.log('Review submitted:', data);
    onClose();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-cornerstone-orange" />
            {language === 'fr' ? 'Laissez votre avis' : 'Leave your review'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'fr' ? 'Votre avis' : 'Your review'}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={language === 'fr' ? 'Partagez votre expérience...' : 'Share your experience...'}
                      className="min-h-[100px]" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
              <Button type="submit">
                {language === 'fr' ? 'Envoyer' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
